<template>
  <div
    :class="[
      n(),
      props.vertical && 'is-vertical'
    ]"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <div
      ref="slider"
      :class="[
        n('runway'),
        showInput && !range && 'show-input',
      ]"
      :style="{ height }"
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
const emit = defineEmits(['input'])
const { n } = createNamespace('slider')
const slider = ref<HTMLElement | null>(null)
const currentPosition = ref()
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
      ? { top: currentPosition.value }
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

const onButtonDown = (e: MouseEvent | TouchEvent) => {
  const {clientX, clientY} = getClientXY(e)
  initData.startX = clientX
  initData.startY = clientY
  const sliderInfo: DOMRect = slider.value!.getBoundingClientRect()
  const sliderLeft = sliderInfo.left
  const sliderTop = sliderInfo.top
  const sliderWidth = sliderInfo.width
  const sliderHeight = sliderInfo.height
  const mouseMove = (e: MouseEvent) => {
    let diff = 0
    if (props.vertical) {
      diff = (e.clientY - sliderTop) / sliderHeight * 100
    } else {
      diff = (e.clientX - sliderLeft) / sliderWidth * 100
    }

    setPosition(diff)
  }
  const mouseUp = () => {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
  }
  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('mouseup', mouseUp)
}
const onLeftKeyDown = () => {

}
const onRightKeyDown = () => {
  
}
const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number
  if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY
    clientX = (event as TouchEvent).touches[0].clientX
  } else {
    clientY = (event as MouseEvent).clientY
    clientX = (event as MouseEvent).clientX
  }
  return {
    clientX,
    clientY,
  }
}
const setPosition = (newPosition: number) => {
  if (newPosition <= 0) newPosition = 0
  if (newPosition >= 100) newPosition = 100
  currentPosition.value = newPosition + '%'
  emit('input', newPosition / 100 * props.max)
}

</script>

<style lang="less">
@import './slider.less';
</style>
