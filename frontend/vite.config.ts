/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import { defineConfig as testConfig } from "vitest/config";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react(), tailwindcss()],
})

const tstConfig = testConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

export default {
  ...config,
  ...tstConfig,
};
