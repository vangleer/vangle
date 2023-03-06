<template>
  <div :class="[n('bar'), verticle ? `is-verticle` : `is-${verticle}`]">
    <div ref="thumbRef" :class="n('thumb')" :style="thumbStyle"></div>
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

defineExpose({
  handleScroll
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
