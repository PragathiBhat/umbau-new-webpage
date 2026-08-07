import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Relative base -- makes every asset URL relative to wherever index.html
// actually is, so the build works from any path/domain (a repo subpath, a
// different org's Pages site, a different depth entirely) without knowing
// the deployment location at build time. HashRouter never changes the
// document's actual pathname, only the #fragment, so this stays correct
// across every in-app route too.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
