import { AppNode } from "../../types";
import { Handle, Position } from "@xyflow/react";
import { Puzzle } from "lucide-react";

export const CustomNode = ({ data }: { data: AppNode["data"] }) => {
  return (
    <div className="relative px-4 py-3 rounded-lg border-2 border-pink-500/40 bg-card shadow-lg min-w-[160px] tech-border">
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-pink-500"
      />
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-pink-500"
      />

      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-pink-500/20">
          <Puzzle className="w-4 h-4 text-pink-400" />
        </div>
        <div className="text-sm font-semibold">{data.label}</div>
      </div>

      {data.description && (
        <div className="text-xs text-muted-foreground">{data.description}</div>
      )}
    </div>
  );
};
