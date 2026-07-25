import fs from "node:fs/promises";
import path from "node:path";

const source = "https://lenterne-v2-brindes-final-preview.vercel.app";
const routes = [
  "/",
  "/catalogo",
  "/sobre",
  "/orcamento",
  "/carrinho",
  "/conta",
  "/gerente",
  "/privacidade",
  "/trocas",
  "/produto/copo-twister-500ml-personalizado",
  "/produto/porta-cracha-retratil-personalizado",
  "/produto/caneca-acrilica-rosqueavel",
  "/produto/cordao-personalizado-15mm",
  "/produto/caldereta-300ml-personalizada",
  "/produto/caldereta-300ml-sem-personalizacao",
  "/produto/prancheta-mdf-a5",
  "/produto/porta-oculos-personalizado"
];
const assets = ["/styles.css", "/app.js", "/robots.txt", "/sitemap.xml"];
const output = "dist";

await fs.rm(output, { recursive: true, force: true });

for (const route of routes) {
  const response = await fetch(source + route);
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);

  const html = await response.text();
  if (!html.includes("Lenterne Brindes")) {
    throw new Error(`${route}: conteúdo inesperado`);
  }

  const file = route === "/"
    ? `${output}/index.html`
    : `${output}${route}/index.html`;

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}

for (const asset of assets) {
  const response = await fetch(source + asset);
  if (!response.ok) throw new Error(`${asset}: HTTP ${response.status}`);

  const file = `${output}${asset}`;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, Buffer.from(await response.arrayBuffer()));
}

console.log(`STATIC_OK ${routes.length} pages + ${assets.length} assets`);
