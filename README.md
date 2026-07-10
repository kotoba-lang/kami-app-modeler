# kami-app-modeler

Interactive polygon-modeling application. It executes immutable topology edits
through `kami-engine-modeling` and uploads the resulting arbitrary vertex/index
mesh into the real `kotoba-lang/webgpu` WGPU mesh pipeline. The Pages build has
real GPU rendering, orbit navigation, face extrusion, undo/redo, EDN export,
and selectable Blender/Maya/3ds Max/Cinema 4D interaction profiles. UI markup
and styling are generated exclusively through `kotoba-lang/html` and `css`.
