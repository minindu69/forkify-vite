import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isGitHubPages = process.env.DEPLOY_TARGET === "gh-pages";

  return {
    base: isGitHubPages ? "/forkify-vite/" : "/",
  };
});
