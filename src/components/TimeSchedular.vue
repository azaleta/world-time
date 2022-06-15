<script setup lang="ts">
function onDelete(idx: number) {
  removeZone(idx)
}
function onUp(idx: number) {
  sortZone(idx, -1)
}
function onDown(idx: number) {
  sortZone(idx, 1)
}
</script>

<template>
  <div>
    <div
      v-for="zone, idx of zoneSelected.value" :key="zone.name"
      px4 py2 border="b base rounded" relative
    >
      <TimeZoneItem :timezone="zone">
        <TimeDial :timezone="zone" />
      </TimeZoneItem>
      <div
        absolute left="-35px" top-2
        text-l flex="~ col" justify-center items-center
      >
        <button
          button-base i-carbon-close-outline
          @click="onDelete(idx)"
        />
        <button
          v-if="idx > 0"
          button-base
          i-carbon-caret-up @click="onUp(idx)"
        />
        <button
          v-if="idx < zoneSelected.value.length - 1"
          button-base i-carbon-caret-down
          @click="onDown(idx)"
        />
      </div>
    </div>
  </div>
</template>
