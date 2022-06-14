<script setup lang="ts">
import type { TimeZone } from '~/types'

let inputZone = $ref('')
let index = $ref(0)

const searchResult = $computed(() => {
  if (inputZone.trim() === '')
    return null
  return searchZone(inputZone)
})

function add(t: TimeZone) {
  addZone(t)
  inputZone = ''
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if (searchResult !== null)
      add(searchResult[index].item)
  }

  if (e.key === 'ArrowUp')
    index = (index - 1) % searchResult.length

  if (e.key === 'ArrowDown')
    index = (index + 1) % searchResult.length
}

function onMouseOver(i: number) {
  index = i
}
</script>

<template>
  <div relative>
    <input
      v-model="inputZone" type="text" border="~ base rounded" placeholder="Search timezone..."
      px2 py1 bg-transparent my5 w-full
      @keydown="onKeyDown"
    >
    <div
      v-show="inputZone"
      absolute top-full left-0 right-0
      border="~ base rounded" bg-base shadow
      max-h-60 overflow-y-auto z-99
    >
      <button
        v-for="fzone, idx in searchResult" :key="fzone.refIndex"
        block hover="bg-truegray" w-full px2
        :class="idx === index ? 'bg-truegray' : ''"
        @click="add(fzone.item)"
        @mouseover="onMouseOver(idx)"
      >
        <TimeZoneItem :timezone="fzone.item" />
      </button>
    </div>
  </div>
</template>
