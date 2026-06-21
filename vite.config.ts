import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

const htaccess = `Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
`;

function htaccessPlugin() {
  return {
    name: "write-htaccess",
    closeBundle() {
      fs.writeFileSync(path.resolve(__dirname, "dist/.htaccess"), htaccess);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), htaccessPlugin()],
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
});
