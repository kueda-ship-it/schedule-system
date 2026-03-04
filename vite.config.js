import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/schedule-system/',
  plugins: [react()],
  server: {
    port: 5174
  }
})
