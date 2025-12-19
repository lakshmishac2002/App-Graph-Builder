import { Button } from './ui/button';
import { Menu, Maximize2 } from 'lucide-react';
import { useAppStore } from '../store/app-store';
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export const TopBar = () => {
  const toggleMobilePanel = useAppStore((state) => state.toggleMobilePanel);
  const reactFlowInstance = useReactFlow();

  const handleFitView = useCallback(() => {
    reactFlowInstance.fitView({ padding: 0.2, duration: 400 });
  }, [reactFlowInstance]);

  return (
    <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2L3 6V14L10 18L17 14V6L10 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10L3 6M10 10L17 6M10 10V18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight glow-text">
            APP GRAPH BUILDER
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleFitView}
          className="hidden md:flex items-center gap-2"
        >
          <Maximize2 className="w-4 h-4" />
          Fit View
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobilePanel}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
