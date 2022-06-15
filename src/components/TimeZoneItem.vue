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

const offset = $computed(() => timezone.offset > 0 ? `+${timezone.offset}` : timezone.offset)

const dateFormatter = Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour: 'numeric',
  minute: 'numeric',
  // hour12: false,
})
const time = $computed(() => dateFormatter.format(nowTime.value))
</script>

<template>
  <div flex gap2 py1 flex-wrap>
    <div text="l" w-6 ma>
      {{ offset }}
    </div>
    <div flex="col" text-left flex-auto w-20>
      <div text-l>
        {{ city }}
        <sup border="~ base rounded" text-sm px1>{{ timezone.abbr }}</sup>
      </div>
      <div op50 leading-1em text-sm>
        {{ state }}
      </div>
    </div>
    <div text="l" ma tabular-nums>
      {{ time }}
    </div>
    <slot />
  </div>
</template>
