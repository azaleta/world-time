<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const upperCase = computed(() => props.name.toUpperCase())
</script>

<template>
<div text="green 2xl" font-mono>World-time {{upperCase}}</div>
<div i-carbon-bee text="blue-800 2xl"></div>
</template>