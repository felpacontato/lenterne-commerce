import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const stylesPath = resolve(root, "packages/storefront/src/styles.css");
const sourceUrl = "https://lenterne-v2-brindes-27y4casl4-felpa-dev-studio.vercel.app/_next/static/chunks/0zx1v5hkp_-of.css";

const current = await readFile(stylesPath, "utf8");
if (!current.trimStart().startsWith("@import")) {
  console.log("CSS V2 já está materializado.");
  process.exit(0);
}

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Não foi possível obter o CSS base da V2: ${response.status}`);
const baseCss = await response.text();
const overrides = current.replace(/^\s*@import[^;]+;\s*/u, "");
await writeFile(stylesPath, `${baseCss.trim()}\n\n${overrides.trim()}\n`, "utf8");
console.log("CSS comercial da V2 incorporado ao bundle local.");
