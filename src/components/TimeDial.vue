<script setup lang="ts">
import { addDays, addHours, format } from 'date-fns'
import type { TimeZone } from '~/types'

const { timezone } = defineProps<{ timezone: TimeZone }>()

const hours = $computed(() =>
  Array.from({ length: 24 }, (_, idx) => getShowHours(idx)),
)

const days = $computed(() => {
  const idx = hours.findIndex(h => Number.isNaN(+h))
  if (idx < 0) { return [hours] }
  else {
    return [
      hours.slice(0, idx),
      hours.slice(idx),
    ]
  }
})

const dateFormatterHour = Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour: 'numeric',
  hour12: false,
})

const timeZoneStartDateTime
  = $computed(() => {
    const nowTimeZone = new Date(nowTime.value)
    nowTimeZone.setHours(nowTimeZone.getHours() - 2)
    return nowTimeZone
  })

const startHour = $computed(() => Number.parseInt(dateFormatterHour.format(timeZoneStartDateTime)))

function getShowHours(hr: number) {
  const realHour = (startHour + hr) % 24
  if (realHour === 0) {
    if (hr === 0)
      return format(timeZoneStartDateTime, 'MMM dd')
    return format(addDays(timeZoneStartDateTime, 1), 'MMM dd')
  }
  return realHour.toString()
}

function isMidNight(hr: string) {
  if (Number.isNaN(+hr))
    return true
  return Number.parseInt(hr) >= 22 || Number.parseInt(hr) <= 5
}
function isNight(hr: string) {
  if (Number.isNaN(+hr))
    return false
  return Number.parseInt(hr) >= 18 || Number.parseInt(hr) <= 7
}
</script>

<template>
  <div flex="~ gap-1" of-auto items-center justify-center>
    <div v-for="day, i in days" :key="i" flex="~" border="~ sky7/30 rounded-1.5" of-hidden>
      <div
        v-for="hour, idx in day" :key="idx"
        w-7 h-8
        flex="~ col auto"
        items-center justify-center
        :class="[
          isMidNight(hour) ? 'bg-sky7/70 text-white' : isNight(hour) ? 'bg-sky/20 ' : '',
        ]"
      >
        <div v-if="!Number.isNaN(+hour)">
          {{ hour }}
        </div>
        <div v-else text="xs" text-center leading-1em>
          {{ hour }}
        </div>
      </div>
    </div>
  </div>
</template>
