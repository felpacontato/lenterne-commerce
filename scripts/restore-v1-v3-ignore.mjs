const allowedProjects = new Set([
  "prj_Yg2KWWjdXgAiizZpsnBNaeaBWGLb",
  "prj_S2TL5Uzp9vFNR2VhdimJEI9VWc08",
  "prj_WnuPux6w0SRKtrkr6iHQ9uDdBMfR",
  "prj_K8ElitHNEAnkVPaN9yK8MNZ0i4q6",
]);

const projectId = process.env.VERCEL_PROJECT_ID ?? "";

if (allowedProjects.has(projectId)) {
  console.log(`Restaurando projeto autorizado: ${projectId}`);
  process.exit(1);
}

console.log(`Deploy ignorado para preservar projeto não alvo: ${projectId || "desconhecido"}`);
process.exit(0);
