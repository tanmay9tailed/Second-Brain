import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888, // Use dynamic port or fallback to 5173
    host: true, // Ensures it binds to 0.0.0.0 for external access
  },
});
