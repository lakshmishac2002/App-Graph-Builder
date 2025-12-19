import { NodeType, ServiceNodeData } from '../types';

export interface NodeTemplate {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'service',
    label: 'Service',
    description: 'Backend service or microservice',
    icon: 'Server',
    color: '#3b82f6',
  },
  {
    type: 'database',
    label: 'Database',
    description: 'SQL or NoSQL database',
    icon: 'Database',
    color: '#22c55e',
  },
  {
    type: 'cache',
    label: 'Cache',
    description: 'In-memory cache layer',
    icon: 'Zap',
    color: '#eab308',
  },
  {
    type: 'api',
    label: 'API',
    description: 'REST or GraphQL API',
    icon: 'Globe',
    color: '#a855f7',
  },
  {
    type: 'queue',
    label: 'Queue',
    description: 'Message queue or event bus',
    icon: 'ListOrdered',
    color: '#f97316',
  },
  {
    type: 'frontend',
    label: 'Frontend',
    description: 'Web or mobile frontend',
    icon: 'Monitor',
    color: '#06b6d4',
  },
];

export const createNodeData = (type: NodeType, label: string): ServiceNodeData => {
  return {
    label,
    status: 'healthy',
    description: '',
    configValue: 50,
    nodeType: type,
  };
};

let nodeIdCounter = 0;

export const generateNodeId = (): string => {
  nodeIdCounter++;
  return `node-${Date.now()}-${nodeIdCounter}`;
};
