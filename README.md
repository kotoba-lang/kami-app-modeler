# kami-app-modeler

Interactive polygon-modeling application. It executes immutable topology edits
through `kami-engine-modeling` and uploads arbitrary vertex/index meshes into
the real `kotoba-lang/webgpu` pipeline. The Pages build includes WebGPU-first /
WebGL2-fallback rendering, object and component selection, dimension-driven
sketch constraints, topology tools, BSP Boolean workflows, non-destructive
modifiers, UV/image materials, undo/redo, recovery and EDN/glTF exchange.
UI markup and styling are generated exclusively through `kotoba-lang/html` and
`css`.

Public app: <https://kotoba-lang.github.io/kami-app-modeler/>

The current 5/5 rating applies to the declared browser polygon-modeler scope.
The roadmap to commercial CAD/CAE maturity—NURBS/B-rep and STEP, assemblies,
associative manufacturing drawings, qualified CAE, a production modifier DAG,
very-large scenes and collaboration history—is governed by
[`kami-engine` ADR-0049](../kami-engine/90-docs/adr/0049-kotoba-3d-suite-commercial-cad-maturity.md).

Verify the deployed application with:

```bash
MODELER_URL=https://kotoba-lang.github.io/kami-app-modeler/ npm run verify:webgpu
```
