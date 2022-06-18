<script setup lang="ts">
import type { TimeZone } from '../types'

const { timezone } = defineProps<{
  timezone: TimeZone
}>()

const state = $computed(() => timezone.name.split('/')[0].replace(/_/g, ' '))
const city = $computed(() => {
  if (timezone.name.split('/')[1] === undefined)
    return timezone.name.split('/')[0].replace(/_/g, ' ')
  return timezone.name.split('/')[1].replace(/_/g, ' ')
})

const offset = $computed(() => {
  const offset = timezone.offset - currentOffset.value
  return offset > 0 ? `+${offset}` : `${offset}`
})

const dateFormatter = Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour: 'numeric',
  minute: 'numeric',
  // hour12: false,
})
const time = $computed(() => dateFormatter.format(nowTime.value))
</script>

<template>
  <div gap2 py1 text-center flex="~ wrap">
    <div
      v-if="offset !== '0'"
      text="l left" w-8
      :class="[
        offset.startsWith('+') ? 'text-green' : 'text-red',
      ]"
      :title="timezone.offset > 0 ? `+${timezone.offset} GMT` : `${timezone.offset} GMT`"
    >
      {{ offset }}
    </div>
    <div v-else i-carbon-home text="blue900 xl" op80 w-8 />
    <div flex="col" text-left flex-auto w-30>
      <div text-l>
        {{ city }}
        <sup border="~ base rounded" text-sm px1>{{ timezone.abbr }}</sup>
      </div>
      <div op50 leading-1em text-sm>
        {{ state }}
      </div>
    </div>
    <div text="l center" ma tabular-nums w-25>
      {{ time }}
    </div>
    <slot />
  </div>
</template>
