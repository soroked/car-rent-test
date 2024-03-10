import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/car-rent-test/",
  resolve: {
    alias: {
      src: "/src",
      pages: "src/pages",
      components: "/src/components",
      assets: "/src/assets",
    },
  },
})
