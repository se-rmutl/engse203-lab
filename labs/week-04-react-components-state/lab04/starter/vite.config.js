import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TODO: เปลี่ยน STUDENT-ID ให้ตรง repository ก่อน build
  base: '/engse203-lab04-STUDENT-ID/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});

