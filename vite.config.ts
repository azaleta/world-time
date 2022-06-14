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
        '@vueuse/core',
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
      shortcuts: {
        'border-base': 'border-gray/20 dark:border-gray/15',
        'bg-base': 'bg-white dark:bg-truegray-900',
        'bg-canvas': 'bg-gray/15 dark:bg-truegray-900',
        'button-base': 'op20 hover:op100',
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src/'),
    },
  },
})
