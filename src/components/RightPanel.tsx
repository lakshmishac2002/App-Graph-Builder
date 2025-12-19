import { AppSelector } from "./AppSelector";
import { NodeInspector } from "./NodeInspector";
import { AppSettings } from "./AppSettings";
import { useAppStore } from "../store/app-store";
import { cn } from "../lib/utils";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export const RightPanel = () => {
  const {
    selectedNodeId,
    rightPanelView,
    isMobilePanelOpen,
    setIsMobilePanelOpen,
  } = useAppStore();

  let panelContent;

  if (rightPanelView === "apps") {
    panelContent = <AppSelector />;
  } else if (rightPanelView === "settings") {
    panelContent = <AppSettings />;
  } else if (selectedNodeId) {
    panelContent = <NodeInspector />;
  } else {
    panelContent = (
      <div className="flex items-center justify-center h-full p-4 text-sm text-center text-muted-foreground">
        Select an app or a node to begin
      </div>
    );
  }

  return (
    <>
      {/* Desktop panel */}
      <div className="flex-col hidden border-l md:flex md:w-80 lg:w-96 border-border bg-card/30 backdrop-blur-sm">
        <div className="border-b border-border">
          <AppSelector />
        </div>
        <div className="flex-1 overflow-hidden">{panelContent}</div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity",
          isMobilePanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobilePanelOpen(false)}
      >
        <div
          className={cn(
            "fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-lg transition-transform flex flex-col",
            isMobilePanelOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold">Controls</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobilePanelOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="border-b border-border">
            <AppSelector />
          </div>

          <div className="flex-1 overflow-hidden">{panelContent}</div>
        </div>
      </div>
    </>
  );
};
