import { chromium, firefox, webkit } from "playwright";
import http from "node:http";
import {readFile} from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");
const types = {".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json"};
const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const relative = pathname === "/" ? "index.html" : pathname.slice(1);
  try {
    const file = path.resolve(root, relative);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error("invalid path");
    response.writeHead(200, {"content-type": types[path.extname(file)] || "application/octet-stream"});
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end("not found");
  }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

const engines = {chromium, firefox, webkit};
const name = process.env.BROWSER || "chromium";
const browser = await engines[name].launch({headless: true});
const page = await browser.newPage({viewport: {width: 1280, height: 800}});
const errors = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
await page.goto(process.env.MODELER_URL || baseUrl, {waitUntil: "networkidle"});
await page.waitForFunction(() => window.__kami_modeler_ready === true, null, {timeout: 30000});
await page.click("#new-cube");
await page.click("#save-project");
const state = await page.evaluate(() => JSON.parse(document.querySelector("#debug-state").textContent));
if (state.objectCount !== 2 || state.saveStatus !== "saved") throw new Error(`Core workflow failed: ${JSON.stringify(state)}`);
if (errors.length) throw new Error(errors.join("\n"));
await browser.close();
await new Promise(resolve => server.close(resolve));
console.log(JSON.stringify({browser: name, coreWorkflow: true}));
