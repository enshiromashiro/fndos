import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

type System = {
  version: string,
  commit: string,
}
const system: System = {
  version: "NULL",
  commit: "NULL",
};

import("./system-info.json").then((sys) => {
  system.version = sys.version;
  system.commit = sys.commit;
}).catch(() => {});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "__SYSTEM_VERSION__": `"${system.version}"`,
    "__SYSTEM_COMMIT_ID__": `"${system.commit}"`,
  },
})
