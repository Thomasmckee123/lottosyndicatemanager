import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Server } from 'http'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  define: {
    'process.env': process.env
  }
})
