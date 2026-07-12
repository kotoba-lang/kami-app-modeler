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

const browser = await chromium.launch({headless: true, executablePath: chromium.executablePath()});
const page = await browser.newPage({viewport: {width: 1280, height: 800}});
await page.addInitScript(() => Object.defineProperty(navigator, "gpu", {value: undefined, configurable: false}));
const errors = [];
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
page.on("pageerror", error => errors.push(error.message));
await page.goto(`http://127.0.0.1:${server.address().port}`, {waitUntil: "networkidle"});
await page.waitForFunction(() => window.__kami_modeler_ready === true, null, {timeout: 20000});

const backend = await page.evaluate(() => window.__kami_large_scene_stress());
if (!(backend.backend === "webgl2" && backend.instances === 20000 && backend.capacity >= 20000 &&
      backend.geometryKinds === 1 && backend.drawCalls === 1 && backend.residentTriangles >= 10000000 &&
      backend.firstMs < 3000 && backend.sampleFrames === 120 && backend.p95SubmitMs < 33.34 &&
      backend.maxSubmitMs < 100 && backend.instanceBufferBytes < 10000000 &&
      JSON.stringify(backend.pickingIds) === JSON.stringify([1, 10000, 20000]) &&
      backend.provenanceRevision === "modeler-large-scene-v1")) {
  throw new Error(`20,000-instance / 10M-triangle WebGL2 fallback gate failed: ${JSON.stringify(backend)}`);
}
if (errors.length) throw new Error(`Browser errors: ${errors.join("\n")}`);

await page.screenshot({path: "test/modeler-webgl2.png"});
await browser.close();
await new Promise(resolve => server.close(resolve));
console.log(JSON.stringify({webgl2: true, largeScene: backend}));
