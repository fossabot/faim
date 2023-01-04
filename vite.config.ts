import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PascalCasedName, name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
        // '@vueuse/core',
      ],
    }),
    Components({ /* options */ }),
    UnoCSS({
      presets: [
        presetAttributify({ /* options */ }),
        presetUno(),
        // ...other presets
      ],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      name,
      entry: 'src/index.ts',
    },
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      external: [
        'element-plus',
        'element-ui',
        'vue',
        'vue-demi',
      ],
      output: {
        globals: {
          [name]: PascalCasedName,
          'element-plus': 'ElementPlus',
          'element-ui': 'ElementUI',
          'vue': 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
  },
})
