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
await page.waitForFunction(() => window.__kami_modeler_ready === true, null, {timeout: 20000});
const canvas = page.locator("#gpu-canvas");
const box = await canvas.boundingBox();
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
if (errors.length) throw new Error(`Browser errors: ${errors.join("\n")}`);
await page.screenshot({path: "test/modeler-webgpu.png"});
await browser.close();
await new Promise(resolve => server.close(resolve));
console.log(JSON.stringify({before, selection, after, inset, webgpu: true}));
