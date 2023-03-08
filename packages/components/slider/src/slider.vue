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
        @touchstart.passive="onButtonDown"
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
import { computed, ref, CSSProperties, onUnmounted, watch } from 'vue'
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
const tooltipRef = ref()
const visible = ref(false)
let timerId = ref()
const sliderStyle = computed(() => ({
  '--van-slider-main-bg-color': props.color
}))
const currentPosition = computed({
  get: () => props.modelValue as number,
  set: (val) => {
    const { min, max } = props
    const value = Math.floor(val / max * max)
    emit('input', value)
    emit('update:modelValue', value)
  }
})
const tooltipValue = computed(() => 
  props.formatTooltip 
    ? props.formatTooltip(props.modelValue as number)
    : props.modelValue
)
const barStyle = computed<CSSProperties>(() => {
  const value = currentPosition.value * diffValue.value + '%'
  return props.vertical
    ? {
        height: value
      }
    : {
        width: value,
        height: '100%'
      }
})

const diffValue = computed(() => (100 / (props.max - props.min)))

const wrapperStyle = computed(() => {
  const value = currentPosition.value * diffValue.value + '%'
  return (
    props.vertical
      ? { top: value }
      : { left: value }
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
      diff = (clientY - sliderTop) / sliderHeight * (props.max - props.min)
    } else {
      diff = (clientX - sliderLeft) / sliderWidth * (props.max - props.min)
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

function handleKeyDown(e: KeyboardEvent) {
  e.preventDefault()
  const keyCode = e.keyCode
  if ([37, 39].includes(keyCode) && !props.vertical) {
    setPosition(currentPosition.value - (38 - keyCode))
  } else if ([38, 40].includes(keyCode) && props.vertical) {
    setPosition(currentPosition.value - (39 - keyCode))
  }
}

function setUpKeyEvent() {
  if (isFocus.value) {
    window.addEventListener('keydown', handleKeyDown)
  } else {
    window.removeEventListener('keydown', handleKeyDown)
  }
}

const setPosition = (newPosition: number) => {
  const { min, max } = props
  if (newPosition <= 0) newPosition = 0
  if (newPosition >= max - min) newPosition = max - min
  currentPosition.value = newPosition
  
  tooltipRef.value.update()
  visible.value = true
}

function cleanUp() {
  clearTimeout(timerId.value)
  window.removeEventListener('keydown', handleKeyDown)
}

watch(isFocus, (val) => {
  setUpKeyEvent()
})

onUnmounted(() => {
  cleanUp()
})

</script>

<style lang="less">
@import './slider.less';
</style>
