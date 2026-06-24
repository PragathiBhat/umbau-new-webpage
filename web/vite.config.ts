import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" — use it so the
// Pages base path matches whichever repo's workflow built this.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: repoName ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
})
