<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button i-carbon-asleep dark:i-carbon-light @click="toggleDark()" />
</template>

<style lang="scss">
</style>
