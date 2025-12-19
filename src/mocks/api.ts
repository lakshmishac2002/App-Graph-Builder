import { App, GraphData, AppNode } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockApps: App[] = [
  {
    id: 'app-1',
    name: 'User Service',
    description: 'Main authentication and user management service',
  },
  {
    id: 'app-2',
    name: 'Payment Gateway',
    description: 'Payment processing and transaction handling',
  },
  {
    id: 'app-3',
    name: 'Analytics Engine',
    description: 'Real-time analytics and reporting system',
  },
];

const mockGraphs: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      {
        id: 'node-1',
        type: 'api',
        position: { x: 100, y: 100 },
        data: {
          label: 'Auth API',
          status: 'healthy',
          description: 'Authentication endpoint',
          configValue: 75,
          nodeType: 'api',
        },
      },
      {
        id: 'node-2',
        type: 'database',
        position: { x: 350, y: 100 },
        data: {
          label: 'User DB',
          status: 'healthy',
          description: 'PostgreSQL database',
          configValue: 60,
          nodeType: 'database',
        },
      },
      {
        id: 'node-3',
        type: 'cache',
        position: { x: 225, y: 250 },
        data: {
          label: 'Cache Layer',
          status: 'degraded',
          description: 'Redis cache',
          configValue: 85,
          nodeType: 'cache',
        },
      },
    ] as AppNode[],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
      },
      {
        id: 'edge-2',
        source: 'node-1',
        target: 'node-3',
        type: 'smoothstep',
      },
    ],
  },
  'app-2': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 100 },
        data: {
          label: 'Payment API',
          status: 'healthy',
          description: 'Payment processing service',
          configValue: 90,
          nodeType: 'service',
        },
      },
      {
        id: 'node-2',
        type: 'api',
        position: { x: 400, y: 100 },
        data: {
          label: 'Stripe Gateway',
          status: 'healthy',
          description: 'External payment provider',
          configValue: 100,
          nodeType: 'api',
        },
      },
      {
        id: 'node-3',
        type: 'database',
        position: { x: 275, y: 250 },
        data: {
          label: 'Transaction DB',
          status: 'healthy',
          description: 'Transaction storage',
          configValue: 70,
          nodeType: 'database',
        },
      },
    ] as AppNode[],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
      },
      {
        id: 'edge-2',
        source: 'node-1',
        target: 'node-3',
        type: 'smoothstep',
      },
    ],
  },
  'app-3': {
    nodes: [
      {
        id: 'node-1',
        type: 'queue',
        position: { x: 100, y: 150 },
        data: {
          label: 'Data Collector',
          status: 'healthy',
          description: 'Event collection service',
          configValue: 80,
          nodeType: 'queue',
        },
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 350, y: 50 },
        data: {
          label: 'Analytics Engine',
          status: 'down',
          description: 'Processing engine',
          configValue: 45,
          nodeType: 'service',
        },
      },
      {
        id: 'node-3',
        type: 'frontend',
        position: { x: 350, y: 250 },
        data: {
          label: 'Dashboard',
          status: 'healthy',
          description: 'Reporting interface',
          configValue: 95,
          nodeType: 'frontend',
        },
      },
    ] as AppNode[],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        type: 'smoothstep',
      },
    ],
  },
};

// Mock API functions
export const mockApi = {
  getApps: async (): Promise<App[]> => {
    await delay(300);
    return mockApps;
  },

  getGraph: async (appId: string): Promise<GraphData> => {
    await delay(500);
    
    // Simulate occasional errors for testing
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch graph data');
    }
    
    const graph = mockGraphs[appId];
    if (!graph) {
      throw new Error('Graph not found');
    }
    
    return graph;
  },
};
