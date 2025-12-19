import { Home, Layers, Settings, Activity } from "lucide-react";
import { cn } from "../lib/utils";
import { useAppStore } from "../store/app-store";

type NavView = "home" | "apps" | "monitoring" | "settings";

const navItems: {
  icon: React.ElementType;
  label: string;
  view: NavView;
}[] = [
  { icon: Home, label: "Home", view: "home" },
  { icon: Layers, label: "Apps", view: "apps" },
  { icon: Activity, label: "Monitoring", view: "monitoring" },
  { icon: Settings, label: "Settings", view: "settings" },
];

export const LeftRail = () => {
  const { rightPanelView, setRightPanelView, setSelectedNodeId } =
    useAppStore();

  const handleNavClick = (view: NavView) => {
    // Clear node selection for app-level views
    setSelectedNodeId(null);

    if (view === "apps") {
      setRightPanelView("apps");
    }

    if (view === "settings") {
      setRightPanelView("settings");
    }

    // Home / Monitoring can be wired later
  };

  return (
    <div className="relative z-50 flex flex-col items-center w-16 gap-2 py-4 border-r pointer-events-auto border-border bg-card/30 backdrop-blur-sm">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          (item.view === "apps" && rightPanelView === "apps") ||
          (item.view === "settings" && rightPanelView === "settings");

        return (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.view)}
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center transition-all relative group",
              isActive
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            title={item.label}
          >
            <Icon className="w-5 h-5" />

            {isActive && (
              <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse" />
            )}

            <span className="absolute px-2 py-1 ml-2 text-xs transition-opacity border rounded opacity-0 pointer-events-none left-full bg-card border-border whitespace-nowrap group-hover:opacity-100">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
