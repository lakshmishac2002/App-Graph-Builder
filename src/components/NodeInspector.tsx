import { useAppStore } from '../store/app-store';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { useState, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import { AppNode, NodeStatus } from '../types';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const getStatusVariant = (status: NodeStatus): 'success' | 'warning' | 'destructive' => {
  switch (status) {
    case 'healthy':
      return 'success';
    case 'degraded':
      return 'warning';
    case 'down':
      return 'destructive';
  }
};

const getStatusIcon = (status: NodeStatus) => {
  switch (status) {
    case 'healthy':
      return CheckCircle;
    case 'degraded':
      return AlertTriangle;
    case 'down':
      return XCircle;
  }
};

export const NodeInspector = () => {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const { getNode, setNodes } = useReactFlow<AppNode>();

  const node = selectedNodeId ? getNode(selectedNodeId) : null;

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [configValue, setConfigValue] = useState(50);

  useEffect(() => {
    if (node) {
      setLabel(node.data.label);
      setDescription(node.data.description || '');
      setConfigValue(node.data.configValue);
    }
  }, [node]);

  const updateNodeData = (updates: Partial<AppNode['data']>) => {
    if (!selectedNodeId) return;
    
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === selectedNodeId
          ? { ...n, data: { ...n.data, ...updates } }
          : n
      )
    );
  };

  const handleLabelChange = (value: string) => {
    setLabel(value);
    updateNodeData({ label: value });
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    updateNodeData({ description: value });
  };

  const handleConfigValueChange = (value: number) => {
    setConfigValue(value);
    updateNodeData({ configValue: value });
  };

  if (!node) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select a node to inspect</p>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(node.data.status);

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Service Node
          </h3>
          <Badge variant={getStatusVariant(node.data.status)} className="flex items-center gap-1">
            <StatusIcon className="w-3 h-3" />
            {node.data.status}
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={(value) => setActiveInspectorTab(value as 'config' | 'runtime')}
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="node-name">Node Name</Label>
            <Input
              id="node-name"
              value={label}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="Enter node name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-description">Description</Label>
            <Textarea
              id="node-description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Enter node description"
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="config-slider">Configuration Value</Label>
              <Input
                id="config-input"
                type="number"
                min={0}
                max={100}
                value={configValue}
                onChange={(e) => handleConfigValueChange(Number(e.target.value))}
                className="w-20 h-8 text-center"
              />
            </div>
            <Slider
              id="config-slider"
              value={configValue}
              onChange={handleConfigValueChange}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium">42d 7h 23m</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CPU Usage</span>
              <span className="font-medium text-primary">23%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Memory</span>
              <span className="font-medium text-primary">1.2 GB / 4 GB</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Requests/sec</span>
              <span className="font-medium">147</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium font-mono">v2.4.1</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
