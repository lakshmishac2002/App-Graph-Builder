import { useApps } from '../hooks/use-api';
import { useAppStore } from '../store/app-store';
import { cn } from '../lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';

export const AppSelector = () => {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId, setSelectedNodeId } = useAppStore();

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    setSelectedNodeId(null); // Clear node selection when changing apps
  };

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex items-center gap-2 text-destructive text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>Failed to load apps</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Applications
      </h3>
      <div className="space-y-1">
        {apps?.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppSelect(app.id)}
            className={cn(
              'w-full text-left px-3 py-2 rounded-md transition-all text-sm',
              'hover:bg-secondary/50',
              selectedAppId === app.id
                ? 'bg-primary/20 text-primary border border-primary/30 font-medium'
                : 'text-foreground border border-transparent'
            )}
          >
            <div className="font-medium">{app.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {app.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
