import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/schedule-system/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Antigravityのプロキシ対応のため変更
    port: 5174,
    strictPort: true
  }
})

