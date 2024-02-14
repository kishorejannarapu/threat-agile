/// <reference types="vitest" />
import { UserConfig, defineConfig } from 'vite';
// vite.config.ts (TypeScript)
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   jsxInject: 'import React from \'react\'',
  // },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts'], // Adjust path if needed
  },
} as UserConfig)
