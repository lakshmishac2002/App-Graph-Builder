import { useState } from "react";
import {
  Server,
  Database,
  Zap,
  Globe,
  ListOrdered,
  Monitor,
  Puzzle,
  ChevronDown,
} from "lucide-react";
import { NodeType } from "../types";

type PaletteItem = {
  type: NodeType;
  label: string;
  icon: React.ElementType;
};

const NODE_OPTIONS: PaletteItem[] = [
  { type: "service", label: "Service", icon: Server },
  { type: "database", label: "Database", icon: Database },
  { type: "cache", label: "Cache", icon: Zap },
  { type: "api", label: "API", icon: Globe },
  { type: "queue", label: "Queue", icon: ListOrdered },
  { type: "frontend", label: "Frontend", icon: Monitor },
  { type: "custom", label: "Custom Node", icon: Puzzle },
];

export const NodePalette = () => {
  const [open, setOpen] = useState(false);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";

    // ✅ IMPORTANT: close dropdown AFTER drag starts
    setTimeout(() => setOpen(false), 0);
  };

  return (
    <div className="absolute z-50 left-4 top-4">
      {/* Dropdown button */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()} // ⛔ prevent focus loss
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded shadow bg-card border-border"
      >
        Add Node
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="w-48 mt-2 border rounded shadow-lg bg-card border-border">
          {NODE_OPTIONS.map(({ type, label, icon: Icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => onDragStart(e, type)}
              onMouseDown={(e) => e.stopPropagation()} // ✅ critical
              className="flex items-center gap-2 px-3 py-2 text-sm select-none cursor-grab hover:bg-secondary"
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
