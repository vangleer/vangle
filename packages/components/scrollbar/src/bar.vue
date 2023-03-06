<template>
  <div :class="[n('bar'), verticle ? `is-verticle` : `is-horizontal`]">
    <div ref="thumbRef" :class="n('thumb')" :style="thumbStyle" @mousedown="handleMousedown"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
defineOptions({
  name: 'VanScrollbar'
})
const props = defineProps({
  width: String,
  height: String,
  always: Boolean,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  },
  verticle: {
    type: Boolean,
    default: true
  }
})

const { n } = createNamespace('scrollbar')
const moveY = ref(0)
const moveX = ref(0)
const thumbRef = ref<HTMLElement>()
const thumbStyle = computed<CSSProperties>(() => {
  return {
    width: props.width,
    height: props.height,
    transform: `translate(${moveX.value}px, ${moveY.value}px)`
  }
})

function handleScroll(wrap: HTMLElement) {
  console.log(wrap.scrollTop * props.ratioY)

  moveY.value = wrap.scrollTop * props.ratioY
  moveX.value = wrap.scrollLeft * props.ratioX
}

function handleMousedown(e: MouseEvent) {
  console.log(e)
  const startX = e.clientX
  const startY = e.clientY
  const onMouseMove = (e: MouseEvent) => {
    console.log('onMouseMove')
    const x = e.clientX - startX
    const y = e.clientY - startY
    moveY.value = y
  }
  const onMouseup = (e: MouseEvent) => {
    console.log('mouseup')
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseup)
  
}

defineExpose({
  handleScroll
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
