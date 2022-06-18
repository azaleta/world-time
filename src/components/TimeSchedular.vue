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
function onSetDefault(idx: number) {
  setDefaultTimezone(idx)
}
</script>

<template>
  <div of-x-auto relative>
    <div
      v-for="zone, idx of zoneSelected.value" :key="zone.name"
      px4 py2 border="b base" relative
    >
      <TimeZoneItem :timezone="zone" w-max>
        <TimeDial :timezone="zone" />
      </TimeZoneItem>
      <div
        absolute left="-35px" top-2
        text-l flex="~ col" justify-center items-center
      >
        <button
          v-if="zone.name !== defaultTimeZone.value" button-base
          i-carbon-close-outline
          @click="onDelete(idx)"
        />
        <button
          v-if="zone.name !== defaultTimeZone.value" button-base
          i-carbon-home
          @click="onSetDefault(idx)"
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
    <SelectionOverlay absolute inset-0 />
  </div>
</template>
