import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')
import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(/*options*/)],
  build: {
    lib: {
      name,
      entry: 'src/main.ts'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'element-ui'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
