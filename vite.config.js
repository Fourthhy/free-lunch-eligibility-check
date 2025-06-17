import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), flowbiteReact(), electron({
      main: {
        entry: 'electron/main.js', // Path to your main process file
      },
      preload: {
        input: 'electron/preload.js', // Path to your preload script
      },
    }), renderer()],
  server: {
    port: 5173
  }
})