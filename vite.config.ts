import {resolve} from 'node:path';
import {defineConfig} from 'vite';

// User site: https://dlm6693.github.io — assets at root.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        now: resolve(__dirname, 'now/index.html'),
      },
    },
  },
});
