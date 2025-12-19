import { AppNode } from "../../types";
import { Globe } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

export const ApiNode = ({ data }: { data: AppNode["data"] }) => {
  return (
    <div className="relative px-4 py-3 rounded-lg border-2 border-purple-500/40 bg-card shadow-lg min-w-[160px] tech-border group hover:border-purple-500/60 transition-all">
      {/* TARGET (incoming connections) */}
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-purple-500"
      />

      {/* SOURCE (outgoing connections) */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-purple-500"
      />

      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-500/20">
          <Globe className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-sm font-semibold">{data.label}</div>
      </div>

      {data.description && (
        <div className="text-xs text-muted-foreground">{data.description}</div>
      )}

      <div className="absolute w-3 h-3 transition-opacity bg-purple-500 rounded-full opacity-0 -top-1 -right-1 group-hover:opacity-100 animate-pulse" />
    </div>
  );
};
