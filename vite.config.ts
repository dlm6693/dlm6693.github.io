import {resolve} from 'node:path';
import {defineConfig} from 'vite';

const root = import.meta.dirname;

// User site: https://dlm6693.github.io — assets at root.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about/index.html'),
        now: resolve(root, 'now/index.html'),
      },
    },
  },
});
