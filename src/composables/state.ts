import type { TimeZone } from '~/types'

export interface State {
  name?: string
  description?: string
  timezone: string[]
  defaultTimezone: string
  date: Date
  selection?: Selection
}

export interface Selection {
  from: Date
  to: Date
}

const yourLocalTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
export const nowTime = useNow({ interval: 10000 })

const state = useStorage<State>('world-time-state', {
  timezone: [],
  defaultTimezone: yourLocalTimeZone,
  date: nowTime.value,
})

const selectedZoneName = toRef(state.value, 'timezone')
export const defaultTimeZone = toRef(state.value, 'defaultTimezone')

export const zoneSelected = computed(() => selectedZoneName.value.map(name => getTimeZone(name)))
if (!selectedZoneName.value.length) {
  selectedZoneName.value = [yourLocalTimeZone]
  defaultTimeZone.value = yourLocalTimeZone
}

export function addZone(zone: TimeZone) {
  selectedZoneName.value.push(zone.name)
}

export const currentOffset = computed(() => getTimeZone(defaultTimeZone.value).offset)

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

export function setDefaultTimezone(idx: number) {
  const targetZone = selectedZoneName.value[idx]
  if (targetZone === defaultTimeZone.value)
    return
  defaultTimeZone.value = targetZone

  removeZone(idx)
  selectedZoneName.value.unshift(targetZone)
}

