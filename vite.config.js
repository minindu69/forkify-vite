import { defineConfig } from "vite";

export default defineConfig(() => {
  // Read custom environment variable
  const isGitHubPages = process.env.DEPLOY_TARGET === "gh-pages";

  return {
    base: isGitHubPages ? "/forkify-vite/" : "/",
  };
});
