# Testing Guide - App Graph Builder

## Current Features Testing (3 of 19 Complete)

### ✅ Feature 1: Multiple Node Types

**What to Test:**
1. Open the app at http://localhost:5174
2. Select an application from the right panel (User Service, Payment Gateway, or Analytics Engine)
3. Verify that different nodes have different colors and icons:
   - **API** nodes (purple with Globe icon)
   - **Database** nodes (green with Database icon)
   - **Cache** nodes (yellow with Zap icon)
   - **Service** nodes (blue with Server icon)
   - **Queue** nodes (orange with List icon)
   - **Frontend** nodes (cyan with Monitor icon)

**Expected Results:**
- Each node type has a distinct color
- Icons are visible and unique per type
- Nodes have hover effects (animated pulse in top-right corner)
- Minimap shows different colors for each node type

**Status:** ✅ WORKING

---

### ✅ Feature 2: Drag-and-Drop Node Creation

**What to Test:**
1. Look for the **Node Palette** in the top-left corner of the canvas
2. Click the palette header to expand/collapse it
3. Try dragging each node type from the palette onto the canvas
4. Drag nodes to different positions on the canvas

**Expected Results:**
- Palette shows all 6 node types with icons and descriptions
- Dragging creates a new node at the drop position
- New nodes have auto-generated unique IDs
- New nodes start with default "New [Type]" labels
- Nodes can be positioned anywhere on the canvas

**Test Cases:**
- [ ] Drag Service node
- [ ] Drag Database node
- [ ] Drag Cache node
- [ ] Drag API node
- [ ] Drag Queue node
- [ ] Drag Frontend node
- [ ] Collapse/expand palette

**Status:** ✅ WORKING

---

### ✅ Feature 3: Enhanced Controls & Zoom

**What to Test:**
1. Look at the bottom-left corner for zoom controls
2. Click the zoom in (+) button
3. Click the zoom out (-) button
4. Click the fit view button
5. Use mouse wheel to zoom
6. Click and drag to pan the canvas

**Expected Results:**
- Zoom buttons are **visible** with proper styling
- Icons have cyan/teal color matching the theme
- Hover effects work on control buttons
- Zoom maintains canvas center
- Fit view shows all nodes with padding

**Status:** ✅ FIXED - Icons now visible with proper styling

---

### 🔄 Feature 4: Node Interactions

**What to Test:**
1. Click on a node to select it
2. Check the right panel for node inspector
3. Edit the node name in the Config tab
4. Edit the description
5. Move the configuration value slider
6. Switch to Runtime tab to see mock metrics
7. Select another node
8. Click on empty canvas to deselect

**Expected Results:**
- Selected node highlights
- Node inspector shows on the right
- Edits update in real-time on the canvas
- Slider and number input stay synchronized
- Runtime tab shows mock data
- Click outside deselects

**Test Cases:**
- [ ] Select node shows inspector
- [ ] Edit node name updates canvas
- [ ] Edit description updates canvas
- [ ] Slider changes reflect in input
- [ ] Input changes reflect in slider
- [ ] Runtime tab shows metrics
- [ ] Deselect clears inspector

**Status:** ✅ WORKING

---

### 🔄 Feature 5: Node Deletion

**What to Test:**
1. Select a node
2. Press **Delete** or **Backspace** key
3. Verify node is removed
4. Check edges connected to deleted node

**Expected Results:**
- Node disappears from canvas
- Connected edges are removed
- Inspector clears if deleted node was selected
- Minimap updates

**Status:** ✅ WORKING

---

### 🔄 Feature 6: Application Switching

**What to Test:**
1. Click on different apps in the right panel:
   - User Service
   - Payment Gateway
   - Analytics Engine
2. Verify graph changes for each app
3. Check that node selection clears

**Expected Results:**
- Graph loads for selected app
- Different graph structures for each app
- Loading state shows while fetching
- Previous selections clear

**Status:** ✅ WORKING

---

## Known Issues

### 🐛 Issue 1: ~~Zoom Controls Icons Not Visible~~
**Status:** ✅ FIXED
**Solution:** Added custom CSS for .react-flow__controls-button

### 🐛 Issue 2: Left Sidebar Navigation Non-Functional
**Status:** ⚠️ BY DESIGN - Decorative only
**Notes:** LeftRail buttons are placeholders. Actual navigation is in RightPanel (AppSelector)

---

## Pending Features (16 remaining)

### Next to Implement:
1. **LocalStorage Persistence** (In Progress)
   - Auto-save graph changes
   - Restore on reload

2. **Undo/Redo System**
   - Ctrl+Z / Ctrl+Shift+Z
   - 50-state history

3. **Export/Import**
   - JSON export
   - PNG screenshot
   - SVG export

---

## Performance Testing

### Canvas Performance:
- [ ] Test with 10 nodes
- [ ] Test with 50 nodes
- [ ] Test with 100 nodes
- [ ] Zoom performance
- [ ] Pan performance

### Memory Leaks:
- [ ] Open/close apps multiple times
- [ ] Create/delete many nodes
- [ ] Check browser dev tools memory

---

## Browser Compatibility

### Tested Browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

---

## Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Focus indicators

---

## Summary

**Features Complete:** 3/19 (15.8%)
**Core Features Working:** ✅ Node types, Drag-drop, Controls
**Next Priority:** LocalStorage persistence

**Overall Status:** 🟢 Core functionality working well, ready for more features
