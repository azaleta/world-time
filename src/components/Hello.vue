<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const upperCase = computed(() => props.name.toUpperCase())
</script>

<template>
<div>World-time {{upperCase}}</div>
</template>