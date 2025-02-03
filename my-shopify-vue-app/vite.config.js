import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    // Build as a single file in IIFE format
    lib: {
      entry: 'src/main.js',
      name: 'ShopifyVueWidget',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        // Provide a fixed output file name (e.g., main.js)
        entryFileNames: 'main.js',
      },
    },
  },
});
