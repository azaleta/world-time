import type { TimeZone } from '~/types'

const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const selectedZoneName = useStorage<string[]>('world-time-selected-zones', [])

export const nowTime = useNow({ interval: 10000 })

export const zoneSelected = computed(() => selectedZoneName.value.map(name => getTimeZone(name)))
if (!selectedZoneName.value.length)
  selectedZoneName.value.push(currentTimeZone)

export function addZone(zone: TimeZone) {
  selectedZoneName.value.push(zone.name)
}

export function removeZone(idx: number) {
  selectedZoneName.value = selectedZoneName.value.filter((_, i) => i !== idx)
}

export function sortZone(idx: number, direction: 1 | -1) {
  if ((idx === 0 && direction === -1) || (idx === selectedZoneName.value.length - 1 && direction === 1))
    return

  const targetZone = selectedZoneName.value[idx]
  const sortZone = selectedZoneName.value[idx + direction]
  selectedZoneName.value[idx] = sortZone
  selectedZoneName.value[idx + direction] = targetZone
}

