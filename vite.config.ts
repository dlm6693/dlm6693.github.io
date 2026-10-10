import {defineConfig} from 'vite';

// User site: https://dlm6693.github.io — assets at root.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
