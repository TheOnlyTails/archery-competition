import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer(), cssnano()]
    }
  }),

  kit: {
    adapter: adapter(),
    vite: {
      optimizeDeps: {
        exclude: ["@babichjacob/svelte-localstorage"],
      },
      ssr: {
        noExternal: ["@babichjacob/svelte-localstorage"],
      },
    }
  }
}

export default config
