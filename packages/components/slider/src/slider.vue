<template>
  <div
    :class="classes(n(), [props.vertical, n('--vertical')])"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <div
      :class="classes(
        n('runway'),
        [showInput && !range, 'show-input'],
      )"
    >
      <div :class="n('bar')" :style="barStyle" />
      <div
        :class="n('button-wrapper')"
        :style="wrapperStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="onButtonDown"
        @touchstart="onButtonDown"
        @focus="handleMouseEnter"
        @blur="handleMouseLeave"
        @keydown.left="onLeftKeyDown"
        @keydown.right="onRightKeyDown"
        @keydown.down.prevent="onLeftKeyDown"
        @keydown.up.prevent="onRightKeyDown"
      >
        <div :class="n('button')"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, CSSProperties } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SliderProps } from './slider'
defineOptions({
  name: 'VanSlider'
})

const props = defineProps(SliderProps)

const { n, classes } = createNamespace('slider')
const currentPosition = ref('50%')
const barStyle = computed<CSSProperties>(() => {
  return props.vertical
    ? {
        height: currentPosition.value
      }
    : {
        width: currentPosition.value,
        height: '100%'
      }
})

const wrapperStyle = computed(() => {
  return (
    props.vertical
      ? { bottom: currentPosition.value }
      : { left: currentPosition.value }
  ) as CSSProperties
})

const initData = reactive({
  hovering: false,
  dragging: false,
  isClick: false,
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  startPosition: 0,
  newPosition: 0,
  oldValue: props.modelValue,
})

function handleMouseEnter() {
  initData.hovering = true
}
function handleMouseLeave() {
  initData.hovering = false
}

const onButtonDown = () => {

}
const onLeftKeyDown = () => {

}
const onRightKeyDown = () => {
  
}

</script>

<style lang="less">
@import './slider.less';
</style>
