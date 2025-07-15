import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'logging-middleware': path.resolve(__dirname, '../logging-middleware')
    }
  },
  server: {
    port: 3000,
  },
})
