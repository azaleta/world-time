import Fuse from 'fuse.js'
import timezoneRaw from 'timezones.json'
import type { TimeZone } from '~/types'

const timezone = timezoneRaw.flatMap((raw) => {
  return raw.utc.map((utc) => {
    return {
      name: utc,
      offset: raw.offset,
      isdst: raw.isdst,
    } as TimeZone
  })
})

const zoneFuse = new Fuse(timezone, { keys: ['name'] })

export function searchZone(key: string) {
  return zoneFuse.search(key)
}
