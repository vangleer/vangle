<template>
  <Transition name="van-scrollbar-fade">
    <div v-show="always || showBar" ref="barRef" :class="barClaz" @mouseenter="show">
      <div
        ref="thumbRef"
        :class="n('thumb')"
        :style="thumbStyle"
        @mousedown.prevent="handleMousedown"
      >
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { ScrollbarContextKey } from './scrollbar'
import { createNamespace } from '@vangle/utils'
defineOptions({
  name: 'VanScrollbar'
})
const props = defineProps({
  size: String,
  move: {
    type: Number,
    default: 0
  },
  always: Boolean,
  ratio: {
    type: Number,
    default: 1
  },
  vertical: {
    type: Boolean
  }
})
const ctx = inject(ScrollbarContextKey)
const { n } = createNamespace('scrollbar')
const moveY = ref(0)
const moveX = ref(0)
const barRef = ref<HTMLElement>()
const thumbRef = ref<HTMLElement>()
const showBar = ref(false)
const isMouseDown = ref(false)
const thumbStyle = computed<CSSProperties>(() => {
  let translate = ''
  if (props.vertical) {
    translate = `translateY(${props.move}px)`
  } else {
    translate = `translateX(${props.move}px)`
  }
  const sizeKey = props.vertical ? 'height' : 'width'
  return {
    [sizeKey]: props.size,
    transform: translate
  }
})

const barClaz = computed(() => [n('bar'), props.vertical ? `is-vertical` : `is-horizontal`])

function show() {
  showBar.value = true
}

function hide() {
  if (isMouseDown.value) return
  showBar.value = false
}

function handleMousedown(e: MouseEvent) {
  isMouseDown.value = true
  const downX = e.clientX
  const downY = e.clientY
  
  const barRect = barRef.value!.getBoundingClientRect()
  const thumbRect = thumbRef.value!.getBoundingClientRect()

  const mouseX = downX - thumbRect.left
  const mouseY = downY - thumbRect.top

  const maxX = barRect.width - thumbRect.width
  const maxY = barRect.height - thumbRect.height
  const onMouseMove = (e: MouseEvent) => {
    let x = e.clientX - barRect.left - mouseX
    x = x > maxX ? maxX : x < 0 ? 0 : x

    let y = e.clientY - barRect.top - mouseY
    y = y > maxY ? maxY : y < 0 ? 0 : y

    moveX.value = x
    moveY.value = y

    props.vertical ? scroll(y / props.ratio) : scroll(x / props.ratio)
  }
  const onMouseup = (e: MouseEvent) => {
    isMouseDown.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseup)

  return false
}
function scroll(num: number) {
  props.vertical ? ctx?.setScrollTop(num) : ctx?.setScrollLeft(num)
}

function mouseEnter() {
  show()
}
function mouseLeave() {
  hide()
}

onMounted(() => {
  ctx?.wrapRef.value.addEventListener('mouseenter', mouseEnter)
  ctx?.wrapRef.value.addEventListener('mouseleave', mouseLeave)
})

defineExpose({
  show,
  hide
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
