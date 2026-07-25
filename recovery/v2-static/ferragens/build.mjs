import fs from "node:fs/promises";
import path from "node:path";

const source = "https://lenterne-v2-ferragens-final-preview.vercel.app";
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
  "/produto/argola-chaveiro-13mm",
  "/produto/argola-chaveiro-16mm",
  "/produto/argola-chaveiro-19mm",
  "/produto/argola-chaveiro-22mm",
  "/produto/garra-dentada-15mm",
  "/produto/garra-dentada-20mm",
  "/produto/clip-jacare-solto",
  "/produto/clip-jacare-com-argola-22mm"
];
const assets = ["/styles.css", "/app.js", "/robots.txt", "/sitemap.xml"];
const output = "dist";

await fs.rm(output, { recursive: true, force: true });

for (const route of routes) {
  const response = await fetch(source + route);
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);

  const html = await response.text();
  if (!html.includes("Lenterne Ferragens")) {
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
