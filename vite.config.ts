import react from '@vitejs/plugin-react-swc'
import { UserConfigExport, defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts'
  },
} as UserConfigExport)
