import { defineConfig } from "vite";

// For deployment, change this to the exact repository name on GitHub.
const repositoryName = "engse203-lab02-solution";

export default defineConfig({
  base: `/${repositoryName}/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
