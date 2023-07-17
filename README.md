# 🏡 [Metacity Studio](https://studio.metacity.cc)

![Screenshot](./studio.png)

Metacity Studio is an online tool for integrating and visualization of spatial data.

Running at [studio.metacity.cc](https://studio.metacity.cc)

## How does it work?

Prepare urban visualizations online. Load your data, align it, and export it for viewing online.

-   works best with small to medium-sized datasets
-   allows yout to connect 3D models and metadata

## What formats can you load in?

Currently:

-   SHP (Polygons and MultiPatch only for now)
-   IFC
-   GLTF (triangles only)
-   Metacity File Format (binary Studio export)

## Roadmap

The project is in active development. The roadmap is as follows:

---

## Backlog

These features are planned for the future, but not yet scheduled.

### Priority Backlog

-   [ ] Shortcuts for tab switching in editor

### Backlog

-   [ ] Loading GeoJSON
-   [ ] Loading IFC metadata loading (memory-efficiency???)
-   [ ] Frustum culling
-   [ ] Connect to on-line storage and model admin
-   [ ] Extract Utils to separate SDK form metacity editors
-   [ ] Optional interactivity - build BVH only if user opts-in to make the loaded models clickable
-   [ ] Optimize deleting models - partition model BVH nodes based on submodels's ids
-   [ ] Insert textured plane (location blueprints for reference)
-   [ ] Refactor General context - setting status messages, etc.
-   [ ] Add a button to open/hide the side panel
-   [ ] Do not allow keys to be empty in table view during conversion

---

## Planned Releases

These features are planned for the future, and scheduled for a specific release.

### v0.5.1

-   [ ] Projecting models onto models (2D onto 3D) - ✨WIP https://github.com/vojtatom/geometry
-   [ ] Loading points and lines from SHP
-   [ ] Export screenshot action
-   [ ] Tooltip on hover over model
-   [ ] Dark mode

### v0.5.0 - Work in progress

⚠️ Breaking changes, old `.metacity` files will not be compatible.
🧠 Call for consultation (TB planned, end of July 2023)

-   [x] Remove groups and hierarchy - all models will be in a flat list
-   [x] Metadata editor replacing Hierarchy editor
    -   [x] Diffing metadata between models
    -   [x] Edit metadata on selection
    -   [x] Editor part 1 - allow editing common attributes
    -   ~~[ ] Editor part 2 - show which attributes are different (can be overwritten and changed to common)~~ - will not implement for now
    -   [x] fulltext search filtering - values only
-   [x] Styling
    -   [x] Style Editor
    -   [x] Auto generate/update styles
    -   [x] Style outline
    -   [x] Apply styles to the geometry
    -   [x] Styling UI - show data infographics
    -   [x] Clean syling button - switches on tab close
-   [x] Updated metadata format - binary buffers + attributes + styling
    -   [x] Metadata export/import
    -   [x] Styles
-   [x] Updated viewer to sync with studio
-   [x] Filter file inputs (add format filters)
-   [x] Click off model - deselect all
-   [x] Group selection in hierarchy tree optimization (shift to select, deselect previous on selectiong previous)
-   [x] When in Table view, click to select model and extend the selection based on groups on key/button/action
-   [x] Import and export data separated into models (do not join on export)
-   [x] Allow renaming models
-   [x] Refactor colors
-   [x] Resolve rejects during loading
-   [x] Allow colormap codes in styles instead of lists of colors [plasma, viridis, inferno, magma]

### v0.4.0 - ✅ Released

🧠 Call for consultation (TB planned, beginning of July 2023)

-   [x] Browsing metadata hierarchy in viewer
-   [x] Restructure menu in Editor (unify UI with viewer)
-   [x] Remove metadata view from transform view
-   [x] Display stats
-   [x] Styling based on data in hierarchy
-   [x] Move metadata layer styling up and down (in view controls)

### v0.3.2 - ✅ Released

-   [x] Viewer Base - making it the default view
-   [x] Loading models to viewer
-   [x] View Controls

### v0.3.1 - ✅ Released

-   [x] Bugfix in binary export

### v0.3.0 - ✅ Released

-   [x] Remove the conversion process and support switching between transform and table mode
    -   [x] add create/remove modifiers for hierarchy
    -   [x] move hierarchy to Editor Context
-   [x] Project export and import
    -   [x] Hierarchy - matadata convert
    -   [x] Join Models, serialize
    -   [x] Export
    -   [x] Import

### v0.2.1 - ✅ Released

-   [x] Auto setup shading based on height
-   [x] JSON metadata for nodes in hierarchy
    -   [x] Assign metadata to model nodes
-   [x] Resize guard update graphics (The "Oops" message is pretty lame)

🧠 Call for consultation

### v0.2.0 - ✅ Released

-   [x] Infrastructure for the built-in viewer (vite setup, etc.)
-   [x] Building a hierarchy of models (floors, buildings, blocks, etc.) - ✨WIP
    -   [x] Deselect all - button and shortcut
    -   [x] Group models
    -   [x] Group groups
    -   [x] Delete groups
    -   [x] Move groups (and models)
-   [x] View settings in the annotate settings - move it to the canvas
-   [x] Loading tabular data (CSV) and linking it to the hierarchy.
    -   [x] Loading CSV
    -   [x] CSV editor
    -   [x] Multiple CSVs
    -   [x] Linking CSV rows to the hierarchy
    -   [x] Unlinking CSV rows from the hierarchy
-   [x] Resolve table editing issues - maybe leave out table editing all togheter?
-   [x] Privacy Policy docs
-   [x] Add text to the Convert dialog

### v0.1.0 - ✅ Released

-   [x] Rectangular select
-   [x] Merge submodels
-   [x] Delete selected submodel
-   [x] Context Help

### v0.0.4 - ✅ Released

-   [x] Removed IFC metadata loading to optimize memory usage

### v0.0.3 - ✅ Released

-   [x] Selecting alignment for loaded models
-   [x] Worker pool for loading
-   [x] Status - counter, update global loading status
-   [x] Reading metadata from IFC files - inspeciton of metadata?
-   [x] CI na githubu autodeploy
-   [x] Uniforms copy on model add
-   [x] Rotate Splash screen bug

### v0.0.2 - ✅ Released

-   [x] Loading SHP - _needs our own library to load, noone supports multipatch_
-   [x] BVH build into worker
-   [x] Loading screen + Add chicken
-   [x] Add React Context
-   [x] Tabs in sidepanel
-   [x] Redesign
-   [x] Sidepanel view settings
-   [x] Intro screen

### v0.0.1 - ✅ Released

-   [x] Grid in the background
-   [x] Translucent models to see wirefame in the background
-   [x] Snap vertices
-   [x] Translation - scale - rotate
-   [x] Split models
-   [x] Hide models
-   [x] Delete model
