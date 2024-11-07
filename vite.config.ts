import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import system from "./system-info.json" // run `yarn prebuild`

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  define: {
    "__SYSTEM_VERSION__": `"${system.version}"`,
    "__SYSTEM_COMMIT_ID__": `"${system.commit}"`,
  },
})
