import { Node, Edge } from "@xyflow/react";

export interface App {
  id: string;
  name: string;
  description: string;
}

export type NodeStatus = "healthy" | "degraded" | "down";

export type NodeType =
  | "service"
  | "database"
  | "cache"
  | "api"
  | "queue"
  | "frontend"
  | "custom";

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  status: NodeStatus;
  description?: string;
  configValue: number;
  nodeType: NodeType;
}

export type AppNode = Node<ServiceNodeData>;

export interface GraphData {
  nodes: AppNode[];
  edges: Edge[];
}

export type InspectorTab = "config" | "runtime" | "connections" | "validation";
