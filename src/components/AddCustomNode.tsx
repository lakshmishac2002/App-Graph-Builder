import { useState } from "react";
import { useAppStore } from "../store/app-store";
import { generateNodeId, createNodeData } from "../lib/node-templates";
import { AppNode } from "../types";

export const AddCustomNode = () => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  // ✅ CORRECT function from store
  const { addNodeToCanvas } = useAppStore();

  const handleAdd = () => {
    if (!label.trim()) return;

    const newNode: AppNode = {
      id: generateNodeId(),
      type: "custom",
      position: { x: 250, y: 150 },
      data: {
        ...createNodeData("custom", label),
        description,
      },
    };

    // ✅ THIS actually adds the node to React Flow
    addNodeToCanvas(newNode);

    setLabel("");
    setDescription("");
  };

  return (
    <div className="p-4 space-y-3 border-t border-border">
      <h3 className="text-sm font-semibold">Add Custom Node</h3>

      <input
        className="w-full px-2 py-1 text-sm border rounded bg-background border-border"
        placeholder="Node name"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <textarea
        className="w-full px-2 py-1 text-sm border rounded bg-background border-border"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleAdd}
        className="w-full py-1 text-sm rounded bg-primary text-primary-foreground"
      >
        Add Node
      </button>
    </div>
  );
};
