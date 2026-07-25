import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const signal = [
  process.env.VERCEL_PROJECT_ID,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_PROJECT_NAME,
].filter(Boolean).join(" ");

const isV3 = /(?:lenterne-v3-(?:brindes|ferragens)|prj_WnuPux6w0SRKtrkr6iHQ9uDdBMfR|prj_K8ElitHNEAnkVPaN9yK8MNZ0i4q6)/i.test(signal);
const isV2 = /(?:lenterne-v2-(?:brindes|ferragens)|prj_pYw9lekWLVi5mD97sERe3njMc0sb|prj_JGyjX86o1XSTvzBdfBtWCqXQh4a2)/i.test(signal);

if (isV2) throw new Error("Build V2 bloqueado pela restauração isolada de V1/V3.");
if (!isV3) {
  console.log("Selecionada fonte V1 restaurada.");
  process.exit(0);
}

const files = [
  "packages/storefront/src/brand.ts",
  "packages/storefront/src/home.tsx",
  "packages/storefront/src/site-shell.tsx",
  "packages/storefront/src/styles.css",
  "apps/brindes/app/layout.tsx",
  "apps/ferragens/app/layout.tsx",
];

for (const relative of files) {
  const source = resolve(root, "variants/v3", relative);
  const target = resolve(root, relative);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

console.log("Selecionada fonte V3 restaurada.");
