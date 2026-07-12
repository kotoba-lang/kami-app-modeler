import { chromium, firefox, webkit } from "playwright";

const engines = {chromium, firefox, webkit};
const name = process.env.BROWSER || "chromium";
const browser = await engines[name].launch({headless: true});
const page = await browser.newPage({viewport: {width: 1280, height: 800}});
const errors = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
await page.goto(process.env.MODELER_URL || "https://kotoba-lang.github.io/kami-app-modeler/", {waitUntil: "networkidle"});
await page.waitForFunction(() => window.__kami_modeler_ready === true, null, {timeout: 30000});
await page.click("#new-cube");
await page.click("#save-project");
const state = await page.evaluate(() => JSON.parse(document.querySelector("#debug-state").textContent));
if (state.objectCount !== 2 || state.saveStatus !== "saved") throw new Error(`Core workflow failed: ${JSON.stringify(state)}`);
if (errors.length) throw new Error(errors.join("\n"));
await browser.close();
console.log(JSON.stringify({browser: name, coreWorkflow: true}));
