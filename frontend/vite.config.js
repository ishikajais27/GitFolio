// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // export default defineConfig({
// //   plugins: [react()],
// //   optimizeDeps: {
// //     include: ['@mui/icons-material'],
// //   },
// // })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   build: {
//     assetsDir: 'assets',
//     outDir: '../dist',
//     emptyOutDir: true,
//     cssCodeSplit: true, // Ensures CSS is bundled correctly
//     assetsInlineLimit: 0,
//   },
//   root: './src',
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Absolute imports
    },
  },
  build: {
    outDir: '../dist', // Builds to root dist folder
    emptyOutDir: true,
  },
  base: './', // Relative paths
})
