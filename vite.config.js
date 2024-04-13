import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createVuePlugin } from 'vite-plugin-vue2';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    createVuePlugin()
  ],
  server: {
    // Configure the server to support history fallback
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
  }
});