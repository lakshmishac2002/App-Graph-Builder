import { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
  OnNodesDelete,
  BackgroundVariant,
  Edge,
  useReactFlow,
  OnConnect,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useGraph } from "../hooks/use-api";
import { useAppStore } from "../store/app-store";
import { Loader2, AlertCircle } from "lucide-react";
import { AppNode, NodeType } from "../types";

import {
  ServiceNode,
  DatabaseNode,
  CacheNode,
  ApiNode,
  QueueNode,
  FrontendNode,
} from "./nodes";
import { CustomNode } from "./nodes/CustomNode";
import { NodePalette } from "./NodePalette";
import { createNodeData, generateNodeId } from "../lib/node-templates";

const nodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  cache: CacheNode,
  api: ApiNode,
  queue: QueueNode,
  frontend: FrontendNode,
  custom: CustomNode,
};

export const GraphCanvas = () => {
  const { selectedAppId, setSelectedNodeId } = useAppStore();
  const { data: graphData, isLoading, error } = useGraph(selectedAppId);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // ✅ LOAD GRAPH DATA
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes);
      setEdges(graphData.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [graphData, setNodes, setEdges]);

  // 🔗 REQUIRED BRIDGE: Zustand → React Flow
  useEffect(() => {
    useAppStore.setState({
      addNodeToCanvas: (node: AppNode) => {
        setNodes((nds) => nds.concat(node));
      },
    });
  }, [setNodes]);

  const onNodeClick: NodeMouseHandler<AppNode> = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onNodesDelete: OnNodesDelete<AppNode> = useCallback(
    (deleted) => {
      const deletedIds = deleted.map((n) => n.id);
      if (deletedIds.includes(useAppStore.getState().selectedNodeId!)) {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: generateNodeId(),
        type,
        position,
        data: createNodeData(
          type,
          `New ${type.charAt(0).toUpperCase() + type.slice(1)}`
        ),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge({ ...connection, type: "smoothstep", animated: true }, eds)
      );
    },
    [setEdges]
  );

  // ⛔ NO APP SELECTED
  if (!selectedAppId) {
    return (
      <div className="flex items-center justify-center flex-1 grid-pattern">
        <p className="text-sm text-muted-foreground">
          Select an application to view its graph
        </p>
      </div>
    );
  }

  // ⏳ LOADING
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 grid-pattern">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="flex items-center justify-center flex-1 grid-pattern text-destructive">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error.message}</span>
      </div>
    );
  }

  // ✅ MAIN CANVAS
  return (
    <div
      className="relative z-10 flex-1 pointer-events-auto"
      ref={reactFlowWrapper}
    >
      <NodePalette />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={onNodesDelete}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={["Backspace", "Delete"]}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{ type: "smoothstep", animated: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={2}
          color="rgba(6, 182, 212, 0.2)"
        />
        <Controls className="bg-card border-border" />
      </ReactFlow>
    </div>
  );
};
