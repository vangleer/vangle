<template>
  <div
    :class="[
      n(),
      props.vertical && 'is-vertical'
    ]"
    :style="sliderStyle"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    @click.prevent
  >
    <div
      ref="slider"
      :class="[
        n('runway'),
        { 'is-disabled': disabled },
      ]"
      :style="{ height }"
      @mousedown="onButtonDown"
    >
      <div :class="n('bar')" :style="barStyle" />
      <div
        :class="[n('button-wrapper')]"
        :style="wrapperStyle"
        @mousedown="onButtonDown"
        @touchstart="onButtonDown"
      >
        <VanTooltip
          ref="tooltipRef"
          :placement="placement"
          :disabled="!showTooltip"
          :visible="visible"
          :content="tooltipValue + ''"
        >
          <div :class="[n('button'), { dragging: dragging }]"></div>
        </VanTooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, CSSProperties, onUnmounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { SliderProps } from './slider'
import VanTooltip from '../../tooltip'
defineOptions({
  name: 'VanSlider'
})

const props = defineProps(SliderProps)
const emit = defineEmits(['input', 'update:modelValue'])
const { n } = createNamespace('slider')
const slider = ref<HTMLElement | null>(null)
const currentPosition = ref()
const tooltipRef = ref()
const visible = ref(false)
let timerId = ref()
const sliderStyle = computed(() => ({
  '--van-slider-main-bg-color': props.color
}))
const tooltipValue = computed(() => props.formatTooltip ? props.formatTooltip(props.modelValue as number) : props.modelValue)
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
const isFocus = ref(false)
const dragging = ref(false)

const onButtonDown = (e: MouseEvent | TouchEvent) => {
  if (props.disabled) return
  if (dragging.value) return
  dragging.value = true
  isFocus.value = true
  const sliderInfo: DOMRect = slider.value!.getBoundingClientRect()
  const sliderLeft = sliderInfo.left
  const sliderTop = sliderInfo.top
  const sliderWidth = sliderInfo.width
  const sliderHeight = sliderInfo.height
  const isTouch = e.type.startsWith('touch')
  const mouseMove = (e: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = getClientXY(e)
    let diff = 0
    if (props.vertical) {
      diff = (clientY - sliderTop) / sliderHeight * 100
    } else {
      diff = (clientX - sliderLeft) / sliderWidth * 100
    }
    setPosition(diff)
  }
  mouseMove(e)
  const moveType = isTouch ? 'touchmove' : 'mousemove'
  const endType = isTouch ? 'touchend' : 'mouseup'
  const mouseUp = () => {
    dragging.value = false
    window.removeEventListener(moveType, mouseMove)
    window.removeEventListener(endType, mouseUp)
    setUpFocus()
  }
  window.addEventListener(moveType, mouseMove)
  window.addEventListener(endType, mouseUp)
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

function setUpFocus() {
  timerId.value = setTimeout(() => {
    document.addEventListener('click', () => {
      isFocus.value = false
      visible.value = false
    }, { once: true })
  }, 300)
}

const setPosition = (newPosition: number) => {
  if (newPosition <= 0) newPosition = 0
  if (newPosition >= 100) newPosition = 100
  currentPosition.value = newPosition + '%'
  const value = Math.floor(newPosition / 100 * props.max)
  emit('input', value)
  emit('update:modelValue', value)
  tooltipRef.value.update()
  visible.value = true
}

onUnmounted(() => {
  clearTimeout(timerId.value)
})

</script>

<style lang="less">
@import './slider.less';
</style>
