import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  plugins: [
    Vue(),
    Components(),
    AutoImport({
      imports: ['vue']
    }),
    UnoCss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ]
    }),
  ],
})
