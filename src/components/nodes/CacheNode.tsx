import { AppNode } from "../../types";
import { Zap } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

export const CacheNode = ({ data }: { data: AppNode["data"] }) => {
  return (
    <div className="relative px-4 py-3 rounded-lg border-2 border-yellow-500/40 bg-card shadow-lg min-w-[160px] tech-border group hover:border-yellow-500/60 transition-all">
      {/* TARGET (incoming connections) */}
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-yellow-500"
      />

      {/* SOURCE (outgoing connections) */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-yellow-500"
      />

      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500/20">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <div className="text-sm font-semibold">{data.label}</div>
      </div>

      {data.description && (
        <div className="text-xs text-muted-foreground">{data.description}</div>
      )}

      <div className="absolute w-3 h-3 transition-opacity bg-yellow-500 rounded-full opacity-0 -top-1 -right-1 group-hover:opacity-100 animate-pulse" />
    </div>
  );
};
