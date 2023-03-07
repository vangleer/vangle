<template>
  <Thumb
    :move="moveX"
    :size="width"
    :always="always"
    :ratio="ratioX"
  />
  <Thumb
    :move="moveY"
    :size="height"
    :always="always"
    :ratio="ratioY"
    vertical
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Thumb from './thumb.vue'
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
  vertical: {
    type: Boolean
  }
})
const moveY = ref(0)
const moveX = ref(0)

function handleScroll(wrap: HTMLElement) {
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
