import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import os from "node:os";

const root = process.cwd();
const errors = [];
const htmlFiles = [];
const assetFiles = [];
const skipDirs = new Set([".git", "node_modules"]);

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (!skipDirs.has(ent.name)) walk(path.join(dir, ent.name));
      continue;
    }
    const abs = path.join(dir, ent.name);
    const rel = path.relative(root, abs).split(path.sep).join("/");
    if (ent.name.endsWith(".html") && rel !== "googlee81ade407c193009.html") htmlFiles.push(rel);
    assetFiles.push(rel);
  }
}
walk(root);
const assetSet = new Set(assetFiles);
const idMap = new Map();

function idsFor(file, html) {
  const ids = new Set();
  const re = /\bid=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html))) {
    if (ids.has(m[1])) errors.push(file + ": duplicate id #" + m[1]);
    ids.add(m[1]);
  }
  idMap.set(file, ids);
  return ids;
}
function toRepoPath(urlPath, fromFile) {
  let p = decodeURIComponent(urlPath || "");
  if (p.startsWith("/")) p = p.slice(1);
  else p = path.posix.join(path.posix.dirname(fromFile), p);
  p = path.posix.normalize(p);
  if (p === "." || p === "") p = "index.html";
  if (p.endsWith("/")) p += "index.html";
  return p;
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const scanHtml = html.replace(/<!--[\\s\\S]*?-->/g, "");
  const ids = idsFor(file, scanHtml);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(file + ": missing page title");
  if (file !== "404.html" && !/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html)) {
    errors.push(file + ": missing meta description");
  }
  if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(html)) errors.push(file + ": image missing alt text");

  const refs = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    if (!ref || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(ref)) continue;
    let parsed;
    try { parsed = new URL(ref, "https://site-check.invalid/" + file); }
    catch { errors.push(file + ": malformed link " + ref); continue; }
    if (parsed.origin !== "https://site-check.invalid") continue;
    const target = toRepoPath(parsed.pathname, file);
    if (!assetSet.has(target)) {
      errors.push(file + ": broken local link " + ref + " -> " + target);
      continue;
    }
    if (parsed.hash && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(path.join(root, target), "utf8");
      const targetIds = target === file ? ids : idsFor(target, targetHtml);
      const fragment = decodeURIComponent(parsed.hash.slice(1));
      if (fragment && !targetIds.has(fragment)) errors.push(file + ": missing anchor " + ref);
    }
  }

  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = match[1];
    const body = match[2].trim();
    if (!body || /\bsrc=/i.test(attrs)) continue;
    if (/type=["']application\/ld\+json["']/i.test(attrs)) {
      try { JSON.parse(body); } catch { errors.push(file + ": invalid JSON-LD block"); }
      continue;
    }
    const temp = path.join(os.tmpdir(), "site-inline-" + Math.random().toString(36).slice(2) + ".js");
    fs.writeFileSync(temp, body);
    const check = spawnSync(process.execPath, ["--check", temp], { encoding: "utf8" });
    fs.rmSync(temp, { force: true });
    if (check.status !== 0) errors.push(file + ": inline JavaScript syntax error: " + (check.stderr || check.stdout).trim());
  }
}

for (const file of assetFiles.filter(f => f.endsWith(".js"))) {
  const check = spawnSync(process.execPath, ["--check", path.join(root, file)], { encoding: "utf8" });
  if (check.status !== 0) errors.push(file + ": JavaScript syntax error: " + (check.stderr || check.stdout).trim());
}

const sitemapPath = path.join(root, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) errors.push("sitemap.xml is missing");
else {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  if (!/<urlset[\s\S]*<\/urlset>/.test(xml)) errors.push("sitemap.xml: missing urlset root");
  if (xml.includes("\\n")) errors.push("sitemap.xml: contains a literal escaped newline");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (!locs.length) errors.push("sitemap.xml: no URL entries");
  for (const loc of locs) {
    const u = new URL(loc);
    const target = toRepoPath(u.pathname, "index.html");
    if (!assetSet.has(target)) errors.push("sitemap.xml: URL has no matching page: " + loc);
  }
}

const cname = fs.existsSync(path.join(root, "CNAME")) ? fs.readFileSync(path.join(root, "CNAME"), "utf8").trim() : "";
if (cname !== "calc.enlightedinc.in") errors.push("CNAME must remain calc.enlightedinc.in");
const ads = fs.existsSync(path.join(root, "ads.txt")) ? fs.readFileSync(path.join(root, "ads.txt"), "utf8") : "";
if (!ads.includes("pub-8514769474183944")) errors.push("ads.txt publisher ID missing or changed");
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!home.includes('ca-pub-8514769474183944')) errors.push("Homepage AdSense publisher ID missing or changed");

console.log("Checked " + htmlFiles.length + " HTML pages and " + assetFiles.length + " files.");
if (errors.length) {
  console.error("\nSite checks failed:");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
console.log("All static site checks passed.");