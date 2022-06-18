<script setup lang="ts">
let left = $ref(40)
const top = $ref(0)
const right = $ref(0)
const bottom = $ref(0)
let width = $ref(0)

const el = ref<HTMLDivElement>()
const box = reactive(useElementBounding(el))

const { pressed } = useMousePressed()
const { x, y } = useMouse()

let startX = $ref(0)

watchEffect(() => {
  if (!pressed.value)
    return

  if (x.value < startX) {
    left = x.value - box.left
    width = startX - x.value
  }
  else {
    const dx = x.value - box.left // App.vue has the margin -> the absolute position should minus the margin
    width = dx - left
  }
})

useEventListener('mousedown', () => {
  startX = x.value
  left = x.value - box.left // App.vue has the margin -> the absolute position should minus the margin
})

useEventListener('mouseup', () => {
  if (width <= 20)
    width = 80
})

const position = computed(() => ({
  left: `${left}px`,
  top: `${top}px`,
  width: `${width}px`,
  bottom: `${bottom}px`,
}))

const positionWhiteLeft = computed(() => ({
  left: `${0}px`,
  top: `${top}px`,
  width: `${left}px`,
  bottom: `${bottom}px`,
}))

const positionWhiteRight = computed(() => ({
  left: `${left + width}px`,
  top: `${top}px`,
  right: `${right}px`,
  bottom: `${bottom}px`,
}))
</script>

<template>
  <div v-show="pressed || width !== 0" ref="el" pointer-events-none>
    <div absolute :style="positionWhiteLeft" bg-white:80 />
    <div absolute border="3 green600" :style="position" />
    <div absolute :style="positionWhiteRight" bg-white:80 />
  </div>
</template>

