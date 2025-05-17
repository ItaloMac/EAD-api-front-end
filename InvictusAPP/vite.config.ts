import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL || 'http://localhost:5000', // URL do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})