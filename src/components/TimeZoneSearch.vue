<script setup lang="ts">
import type { TimeZone } from '~/types'

// defineEmits(['addZone'])

let inputZone = $ref('')

const searchResult = computed(() => {
  if (inputZone.trim() === '')
    return null
  return searchZone(inputZone)
})

function add(t: TimeZone) {
  addZone(t)
  inputZone = ''
}
</script>

<template>
  <div relative>
    <input v-model="inputZone" type="text" border-1 placeholder="Search timezone..." px2 py1 border="~ grey/15 rounded" bg-transparent>
    <div v-show="inputZone" absolute top-full left-0 right-0 bg-gray-900>
      <div v-for="fzone in searchResult" :key="fzone.refIndex" flex gap2>
        <div text="right" w-10 font-mono>
          {{ fzone.item.offset }}
        </div>
        <div font-mono>
          {{ fzone.item.name }}
        </div>
        <button @click="add(fzone.item)">
          Add to MyZones
        </button>
      </div>
    </div>
  </div>
</template>
