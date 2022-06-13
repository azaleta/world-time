import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    Components(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
      ],
      dirs: [
        './src/composables/',
      ],
      vueTemplate: true,
    }),
    UnoCss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src/'),
    },
  },
})
