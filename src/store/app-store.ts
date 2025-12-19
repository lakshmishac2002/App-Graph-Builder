import { create } from "zustand";
import { InspectorTab, AppNode } from "../types";

export type RightPanelView = "node" | "apps" | "settings";

interface AppStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  rightPanelView: RightPanelView;

  // 🔑 bridge function for GraphCanvas
  addNodeToCanvas: (node: AppNode) => void;

  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setRightPanelView: (view: RightPanelView) => void;
  toggleMobilePanel: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  rightPanelView: "node",

  // 🚧 replaced by GraphCanvas at runtime
  addNodeToCanvas: () => {
    console.warn("addNodeToCanvas not yet initialized");
  },

  setSelectedAppId: (id) => set({ selectedAppId: id }),

  setSelectedNodeId: (id) =>
    set({
      selectedNodeId: id,
      rightPanelView: "node",
    }),

  setIsMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setRightPanelView: (view) => set({ rightPanelView: view }),

  toggleMobilePanel: () =>
    set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
}));
