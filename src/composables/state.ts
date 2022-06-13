import type { TimeZone } from '~/types'

export const zoneSelected = ref<TimeZone[]>([])

export function addZone(zone: TimeZone) {
  zoneSelected.value.push(zone)
}
