import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
      outDir: 'dist', // Diretório de saída para o build
    },
  })