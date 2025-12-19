import { ReactFlowProvider } from '@xyflow/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopBar } from './components/TopBar';
import { LeftRail } from './components/LeftRail';
import { RightPanel } from './components/RightPanel';
import { GraphCanvas } from './components/GraphCanvas';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
          <TopBar />
          <div className="flex-1 flex overflow-hidden">
            <LeftRail />
            <GraphCanvas />
            <RightPanel />
          </div>
        </div>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}

export default App;
