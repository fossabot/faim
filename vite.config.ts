import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { parse } from 'semver'
import type { SemVer } from 'semver'
import { version } from 'vue'
import { PascalCasedName, name } from './package.json'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'

const { major, minor } = parse(version) as SemVer

export default defineConfig({
  plugins: [{
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/\{\{ NAME \}\}/, name).replace(/\{\{ VUE_VERSION \}\}/g, String(major === 3 ? major : `${major}.${minor}`))
    },
  }, dts({
    outDir: './',
  }), vue()],
  build: {
    lib: {
      name,
      entry: 'src/index.ts',
    },
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      external: [
        'vue',
        'vue-demi',
        'element-ui',
        'element-plus',
      ],
      output: {
        globals: {
          [name]: PascalCasedName,
          'vue': 'Vue',
          'vue-demi': 'VueDemi',
          'element-ui': 'ElementUI',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
})
