import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, './src'),
      '@/__generated__': resolve(__dirname, './src/__generated__'),
      '@/components': resolve(__dirname, './src/components'),
      '@/constants': resolve(__dirname, './src/constants'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/router': resolve(__dirname, './src/router'),
      '@/store': resolve(__dirname, './src/store'),
    },
  },
});
