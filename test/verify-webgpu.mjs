import { chromium } from "playwright";
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");
const server = http.createServer(async (req, res) => {
  try {
    const requested = req.url === "/" ? "/index.html" : req.url;
    const file = path.join(root, requested.split("?")[0]);
    if (!file.startsWith(root)) throw new Error("forbidden");
    const data = await readFile(file);
    res.writeHead(200, {"content-type": file.endsWith(".js") ? "text/javascript" : "text/html; charset=utf-8"});
    res.end(data);
  } catch (error) { res.writeHead(404); res.end(String(error)); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

// Force Playwright's full Chromium binary; the default headless shell omits
// navigator.gpu even on a Metal-capable macOS host.
const browser = await chromium.launch({headless: true, executablePath: chromium.executablePath()});
const page = await browser.newPage({viewport: {width: 1280, height: 800}});
const errors = [];
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("pageerror", error => errors.push(error.message));
await page.goto(process.env.MODELER_URL || baseUrl, {waitUntil: "networkidle"});
const gpuAvailable = await page.evaluate(async () => !!navigator.gpu && !!(await navigator.gpu.requestAdapter()));
if (!gpuAvailable) throw new Error("A real WebGPU adapter is required for this verification");
try {
  await page.waitForFunction(() => window.__kami_modeler_ready === true, null, {timeout: 20000});
} catch (error) {
  throw new Error(`Modeler readiness failed: ${error.message}; browser errors: ${errors.join(" | ")}`);
}
await page.click("#new-cube");
await page.selectOption("#boolean-target", "1");
await page.click("#boolean-union");
const booleanState = await page.evaluate(() => { const state = JSON.parse(document.querySelector("#debug-state").textContent); return {objectCount: state.objectCount, signedVolume: state.signedVolume, vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length, faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}; });
if (!(booleanState.objectCount === 1 && Math.abs(booleanState.signedVolume - 12) < 1e-5 && booleanState.vertices > 8 && booleanState.faces > 6)) throw new Error(`BSP Boolean union failed: ${JSON.stringify(booleanState)}`);
const canvas = page.locator("#gpu-canvas");
const box = await canvas.boundingBox();
await page.click("#component-vertex");
await page.click("#box-select");
await page.mouse.move(box.x + 2, box.y + 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width - 2, box.y + box.height - 2, {steps: 5});
await page.mouse.up();
const boxSelection = await page.locator("#selection").textContent();
const boxSelectionCount = Number.parseInt(boxSelection, 10);
if (!(boxSelectionCount > 0 && boxSelectionCount <= booleanState.vertices && boxSelection.endsWith("vertices selected"))) throw new Error(`Viewport box selection failed: ${boxSelection}`);
await page.click("#box-select");
await page.click("#component-face");
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
const selection = await page.locator("#selection").textContent();
if (!/^Face \d+ selected$/.test(selection)) throw new Error(`Viewport picking failed: ${selection}`);
const before = await page.evaluate(() => ({vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                           faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
await page.click("#extrude");
const after = await page.evaluate(() => ({stats: document.querySelector("#meshStats").textContent,
                                          vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                          faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
if (!(after.vertices > before.vertices && after.faces > before.faces)) throw new Error(`Extrude did not change topology: ${JSON.stringify({before, after})}`);
await page.click("#inset");
const inset = await page.evaluate(() => ({vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                          faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
if (!(inset.vertices > after.vertices && inset.faces > after.faces)) throw new Error(`Inset did not change topology: ${JSON.stringify({after, inset})}`);
await page.click("#bevel");
const bevel = await page.evaluate(() => ({vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                          faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
if (!(bevel.vertices > inset.vertices && bevel.faces > inset.faces)) throw new Error(`Bevel did not create a chamfer ring: ${JSON.stringify({inset, bevel})}`);
await page.click("#loop-cut");
const loopCut = await page.evaluate(() => ({vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                            faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
if (!(loopCut.vertices === bevel.vertices + 2 && loopCut.faces === bevel.faces + 1)) throw new Error(`Loop cut did not split the selected quad: ${JSON.stringify({bevel, loopCut})}`);
await page.click("#knife");
const knife = await page.evaluate(() => ({vertices: window.__kami_modeler_mesh.vertices?.length ?? window.__kami_modeler_mesh["mesh/vertices"]?.length,
                                          faces: window.__kami_modeler_mesh.faces?.length ?? window.__kami_modeler_mesh["mesh/faces"]?.length}));
if (!(knife.vertices === loopCut.vertices + 2 && knife.faces === loopCut.faces + 1)) throw new Error(`Knife did not split the selected polygon: ${JSON.stringify({loopCut, knife})}`);
await page.click("#select-all-faces");
const multiSelection = await page.locator("#selection").textContent();
if (multiSelection !== `${knife.faces} faces selected`) throw new Error(`Select all did not create a face selection set: ${multiSelection}`);
const beforeBatchMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
await page.click("#move");
const afterBatchMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
if (!(afterBatchMove[2] > beforeBatchMove[2])) throw new Error(`Batch move did not transform the selected face union once: ${JSON.stringify({beforeBatchMove, afterBatchMove})}`);
await page.fill("#snap-increment", "0.3");
await page.locator("#snap-increment").dispatchEvent("change");
await page.click("#snap-selection");
const snappedVertex = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
if (!snappedVertex.every(value => Math.abs(value / 0.3 - Math.round(value / 0.3)) < 1e-8)) throw new Error(`Grid snap did not quantize the selected vertex union: ${JSON.stringify(snappedVertex)}`);
await page.click("#component-vertex");
await page.click("#select-all-faces");
const vertexSelection = await page.locator("#selection").textContent();
if (vertexSelection !== `${knife.vertices} vertices selected`) throw new Error(`Vertex Select All did not select every vertex: ${vertexSelection}`);
const beforeVertexMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
await page.click("#move");
const afterVertexMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
if (Math.abs(afterVertexMove[2] - beforeVertexMove[2] - 0.5) > 1e-8) throw new Error(`Multi-vertex move did not transform each vertex once: ${JSON.stringify({beforeVertexMove, afterVertexMove})}`);
await page.click("#axis-x");
const beforeAxisMove = afterVertexMove;
await page.click("#move");
const afterAxisMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
if (Math.abs(afterAxisMove[0] - beforeAxisMove[0] - 0.5) > 1e-8 || Math.abs(afterAxisMove[2] - beforeAxisMove[2]) > 1e-8) throw new Error(`X-axis constraint changed the wrong coordinates: ${JSON.stringify({beforeAxisMove, afterAxisMove})}`);
await page.click("#gizmo-y");
await page.click("#move");
const afterGizmoMove = await page.evaluate(() => window.__kami_modeler_mesh.vertices?.[0] ?? window.__kami_modeler_mesh["mesh/vertices"]?.[0]);
if (Math.abs(afterGizmoMove[1] - afterAxisMove[1] - 0.5) > 1e-8 || Math.abs(afterGizmoMove[0] - afterAxisMove[0]) > 1e-8) throw new Error(`Viewport Y gizmo changed the wrong coordinates: ${JSON.stringify({afterAxisMove, afterGizmoMove})}`);
await page.click("#component-face");
const faceBeforeFlip = await page.evaluate(() => [...(window.__kami_modeler_mesh.faces?.[0] ?? window.__kami_modeler_mesh["mesh/faces"]?.[0])]);
await page.click("#flip-normals");
const faceAfterFlip = await page.evaluate(() => [...(window.__kami_modeler_mesh.faces?.[0] ?? window.__kami_modeler_mesh["mesh/faces"]?.[0])]);
if (JSON.stringify(faceAfterFlip) !== JSON.stringify([...faceBeforeFlip].reverse())) throw new Error(`Flip Normals did not reverse polygon winding: ${JSON.stringify({faceBeforeFlip, faceAfterFlip})}`);
await page.click("#orient-outward");
const outwardVolume = await page.evaluate(() => JSON.parse(document.querySelector("#debug-state").textContent).signedVolume);
if (!(outwardVolume > 0)) throw new Error(`Orient Outward did not restore positive signed volume: ${outwardVolume}`);
await page.click("#unwrap-uv");
const uvBeforeTransform = await page.evaluate(() => JSON.parse(document.querySelector("#debug-state").textContent).firstUV);
await page.fill("#uv-offset-u", "0.25");
await page.fill("#uv-offset-v", "-0.1");
await page.click("#transform-uv");
const uvAfterTransform = await page.evaluate(() => JSON.parse(document.querySelector("#debug-state").textContent).firstUV);
if (Math.abs(uvAfterTransform[0] - uvBeforeTransform[0] - 0.25) > 1e-8 || Math.abs(uvAfterTransform[1] - uvBeforeTransform[1] + 0.1) > 1e-8) throw new Error(`UV transform did not apply numeric offsets: ${JSON.stringify({uvBeforeTransform, uvAfterTransform})}`);
const generatedTexture = await page.evaluate(() => { const canvas = document.createElement("canvas"); canvas.width = 2; canvas.height = 2; const context = canvas.getContext("2d"); context.fillStyle = "#ff3366"; context.fillRect(0, 0, 1, 2); context.fillStyle = "#33ccff"; context.fillRect(1, 0, 1, 2); return canvas.toDataURL("image/png"); });
const png = Buffer.from(generatedTexture.split(",")[1], "base64");
await page.locator("#texture-file").setInputFiles({name: "pixel.png", mimeType: "image/png", buffer: png});
await page.waitForFunction(() => JSON.parse(document.querySelector("#debug-state").textContent).textureLoaded === true, null, {timeout: 10000});
const textureState = await page.evaluate(() => { const state = JSON.parse(document.querySelector("#debug-state").textContent); return {loaded: state.textureLoaded, uvCount: state.uvCount, dataUri: state.material["base-color-texture"], cacheCount: state.textureCacheCount, device: state.textureDevice}; });
if (!(textureState.loaded && textureState.uvCount === knife.vertices && textureState.dataUri.startsWith("data:image/png;base64,"))) throw new Error(`Texture material was not uploaded and persisted: ${JSON.stringify({textureState, status: await page.locator("#texture-status").textContent(), errors})}`);
await page.selectOption("#modifier-kind", "twist");
await page.click("#add-catalog-modifier");
await page.selectOption("#modifier-kind", "remove-degenerate");
await page.click("#add-catalog-modifier");
const modifierCatalog = await page.evaluate(() => { const state = JSON.parse(document.querySelector("#debug-state").textContent); return {count: state.modifierCount, labels: [...document.querySelectorAll("#modifier-stack .modifier-row span")].map(node => node.textContent)}; });
if (!(modifierCatalog.count === 2 && modifierCatalog.labels[0].startsWith("twist ") && modifierCatalog.labels[1].startsWith("remove-degenerate "))) throw new Error(`Modifier catalog did not evaluate/persist ordered modifiers: ${JSON.stringify(modifierCatalog)}`);
await page.click("#save-project");
await page.click("#save-project");
await page.evaluate(() => localStorage.setItem("kami.modeler.project.v2", "{:corrupt"));
await page.click("#load-project");
const recovered = await page.evaluate(() => { const state = JSON.parse(document.querySelector("#debug-state").textContent); return {objectCount: state.objectCount, texture: state.material["base-color-texture"], uvCount: state.uvCount, modifierCount: state.modifierCount, modifierLabels: [...document.querySelectorAll("#modifier-stack .modifier-row span")].map(node => node.textContent)}; });
if (!(recovered.objectCount === 1 && recovered.uvCount === knife.vertices && recovered.texture.startsWith("data:image/png;base64,") && recovered.modifierCount === 2 && recovered.modifierLabels[0].startsWith("twist ") && recovered.modifierLabels[1].startsWith("remove-degenerate "))) throw new Error(`Backup project recovery lost production state: ${JSON.stringify(recovered)}`);
const stressElapsed = await page.evaluate(() => { const start = performance.now(); for (let index = 0; index < 99; index += 1) document.querySelector("#new-cube").click(); return performance.now() - start; });
await page.waitForFunction(() => JSON.parse(document.querySelector("#debug-state").textContent).objectCount === 100, null, {timeout: 20000});
const stress = await page.evaluate(elapsedMs => { const state = JSON.parse(document.querySelector("#debug-state").textContent); return {objectCount: state.objectCount, evaluatedVertices: state.evaluatedVertices, elapsedMs}; }, stressElapsed);
if (!(stress.objectCount === 100 && stress.elapsedMs < 10000)) throw new Error(`100-object WebGPU scene gate failed: ${JSON.stringify(stress)}`);
const largeScene = await page.evaluate(() => window.__kami_large_scene_stress());
if (!(largeScene.backend === "webgpu" && largeScene.instances === 20000 && largeScene.capacity >= 20000 && largeScene.geometryKinds === 1 && largeScene.drawCalls === 1 && largeScene.residentTriangles >= 10000000 && largeScene.firstMs < 3000 && largeScene.sampleFrames === 120 && largeScene.p95SubmitMs < 33.34 && largeScene.maxSubmitMs < 100 && largeScene.instanceBufferBytes < 10000000)) throw new Error(`20,000-instance / 10M-triangle WebGPU performance gate failed: ${JSON.stringify(largeScene)}`);
if (errors.length) throw new Error(`Browser errors: ${errors.join("\n")}`);
await page.screenshot({path: "test/modeler-webgpu.png"});
await browser.close();
await new Promise(resolve => server.close(resolve));
console.log(JSON.stringify({booleanState, boxSelection, before, selection, after, inset, bevel, loopCut, knife, multiSelection, batchMove: {beforeBatchMove, afterBatchMove}, snappedVertex, vertexSelection, vertexMove: {beforeVertexMove, afterVertexMove}, axisMove: {beforeAxisMove, afterAxisMove, afterGizmoMove}, normals: {faceBeforeFlip, faceAfterFlip, outwardVolume}, uvTransform: {uvBeforeTransform, uvAfterTransform}, textureState, modifierCatalog, recovered, stress, largeScene, webgpu: true}));
