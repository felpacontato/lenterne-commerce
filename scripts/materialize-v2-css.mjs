import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceUrl = "https://lenterne-v2-brindes-27y4casl4-felpa-dev-studio.vercel.app/_next/static/chunks/0zx1v5hkp_-of.css";
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Não foi possível obter o CSS base da V2: ${response.status}`);
const css = await response.text();

for (const channel of ["brindes", "ferragens"]) {
  const publicDir = resolve(root, `apps/${channel}/public`);
  await mkdir(publicDir, { recursive: true });
  await writeFile(resolve(publicDir, "v2-base.css"), css, "utf8");
}

console.log("CSS comercial da V2 salvo como arquivo estático local.");
