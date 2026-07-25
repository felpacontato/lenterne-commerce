const signal = [
  process.env.VERCEL_PROJECT_ID,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_PROJECT_NAME,
].filter(Boolean).join(" ");

const allowed = /(?:lenterne-v[13]-(?:brindes|ferragens)|prj_Yg2KWWjdXgAiizZpsnBNaeaBWGLb|prj_S2TL5Uzp9vFNR2VhdimJEI9VWc08|prj_WnuPux6w0SRKtrkr6iHQ9uDdBMfR|prj_K8ElitHNEAnkVPaN9yK8MNZ0i4q6)/i.test(signal);

if (allowed) {
  console.log(`Build autorizado para restauração V1/V3: ${signal}`);
  process.exit(1);
}

console.log(`Build ignorado para proteger V2/outro projeto: ${signal || "sem identificação"}`);
process.exit(0);
