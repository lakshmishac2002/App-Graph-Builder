# App Graph Builder - AI-Powered Architecture Design Tool

A modern, feature-rich application for visualizing, designing, and managing application architectures with **AI-powered insights**, drag-and-drop node creation, and professional-grade editing features.



## Core Features

- **Interactive Graph Visualization** - Built with ReactFlow for intuitive manipulation
- **Node Management** - Create, edit, delete nodes with full CRUD operations
- **Real-time Inspection** - Detailed node inspector with Config & Runtime tabs
- **Status Monitoring** - Visual indicators (Healthy, Degraded, Down)
- **Synced Controls** - Slider and numeric input perfectly synchronized
- **Responsive Design** - Desktop-optimized with mobile drawer

## Tech Stack

- **React 18.2** - UI framework
- **TypeScript 5.2** - Type-safe development with strict mode
- **Vite 5.0** - Fast build tool and dev server
- **ReactFlow (@xyflow/react)** - Graph visualization library
- **TanStack Query** - Data fetching with caching and error handling
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app-graph-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Badge, Button, Input, etc.)
│   ├── AppSelector.tsx # Application selection component
│   ├── GraphCanvas.tsx # ReactFlow graph visualization
│   ├── LeftRail.tsx    # Navigation sidebar
│   ├── NodeInspector.tsx # Node details and configuration
│   ├── RightPanel.tsx  # Right panel with inspector
│   └── TopBar.tsx      # Application header
├── hooks/              # Custom React hooks
│   └── use-api.ts      # TanStack Query hooks for data fetching
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions (cn, etc.)
├── mocks/              # Mock API implementation
│   └── api.ts          # Simulated backend with latency
├── store/              # State management
│   └── app-store.ts    # Zustand store
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types and interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and theme
```

## Key Design Decisions

### Architecture

1. **Component Composition**
   - Separated concerns: layout, canvas, inspector, and data fetching
   - Minimal prop drilling by using Zustand for cross-cutting state
   - ReactFlow state managed separately from app state

2. **State Management Strategy**
   - **Zustand** for UI state: selected app/node, panel visibility, active tab
   - **TanStack Query** for server state: apps list and graph data
   - **ReactFlow hooks** for graph state: nodes, edges, and interactions

3. **Type Safety**
   - Strict TypeScript configuration enabled
   - Comprehensive type definitions for all data structures
   - Generic types used for ReactFlow nodes to ensure data consistency

### Styling Approach

1. **Distinctive Aesthetic**
   - Custom color scheme with cyan/teal primary and purple accent
   - Technical/cyberpunk theme with glowing effects and scanning animations
   - Unique font pairing: Orbitron (display) + Space Mono (body)
   - Dotted background pattern for the canvas area
   - Custom scrollbars and hover effects

2. **Responsive Design**
   - Desktop: Three-column layout (rail + canvas + panel)
   - Mobile: Slide-over drawer for the right panel
   - Breakpoint at `md` (768px) using Tailwind classes

### Data Fetching

1. **Mock API Implementation**
   - Simulated network latency (300-500ms) for realistic UX
   - 5% random error rate for testing error states
   - Three pre-configured apps with different graph topologies

2. **Query Optimization**
   - Apps list: 5-minute stale time (rarely changes)
   - Graph data: 2-minute stale time (moderate update frequency)
   - Queries disabled when dependencies are null
   - Automatic refetch on app selection change

### ReactFlow Integration

1. **Node Configuration**
   - Custom node component with tech-themed styling
   - Node data includes: label, status, description, configValue
   - Status-based coloring in minimap
   - Smooth edge animations with step connections

2. **Interactions**
   - Click to select nodes
   - Drag to reposition
   - Delete/Backspace to remove nodes
   - Pane click to deselect
   - Fit view on initial load and via toolbar button

### Inspector Features

1. **Tabbed Interface**
   - Config tab: Name, description, and value slider
   - Runtime tab: Mock metrics (uptime, CPU, memory, etc.)
   - Tab state persisted in Zustand

2. **Synchronized Controls**
   - Slider and numeric input bidirectionally synced
   - Updates immediately reflected in ReactFlow node data
   - Range: 0-100 with step of 1

## Known Limitations

1. **No Persistence**
   - Changes to nodes are in-memory only
   - No backend to save modifications
   - Refresh loses all edits

2. **Limited Node Types**
   - All nodes use the same "default" type
   - No specialized DB or service node types (can be extended)

3. **No Add Node Functionality**
   - Users can only modify/delete existing nodes
   - Adding new nodes would require additional UI (bonus feature)

4. **Simplified Error Handling**
   - Basic error states with retry on query invalidation
   - No detailed error recovery flows

5. **Static Mock Data**
   - Only three pre-configured applications
   - Graph structures are fixed (not dynamically generated)


## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+



Build command: `npm run build`
Output directory: `dist`
