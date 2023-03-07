<template>
  <div
    :class="[n()]"
  >
    <div
      ref="wrapRef"
      :class="wrapClz"
      :style="wrapStyle"
      @scroll.passive="handleScroll"
    >
      <div ref="viewRef" :class="n('view')">
        <slot></slot>
      </div>
    </div>
    <Bar
      ref="barRef"
      :width="sizeWidth"
      :height="sizeHeight"
      :always="always"
      :ratio-x="ratioX"
      :ratio-y="ratioY"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch, CSSProperties, nextTick, onUpdated } from 'vue'
import { createNamespace, addUnit } from '@vangle/utils'
import { ScrollbarProps, ScrollbarContextKey } from './scrollbar'
import Bar from './bar.vue'
defineOptions({
  name: 'VanScrollbar'
})

const props = defineProps(ScrollbarProps)
const emit = defineEmits(['scroll'])
const { n } = createNamespace('scrollbar')
const wrapRef = ref<HTMLElement>()
const viewRef = ref<HTMLElement>()
const barRef = ref()

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const ratioX = ref(1)
const ratioY = ref(1)

const wrapClz = computed(() => ([n('wrap'), !props.native && n('wrap--hidden-default'), props.vertical ? 'is-vertical' : 'is-horizontal']))
const wrapStyle = computed<CSSProperties>(() => ({
  height: addUnit(props.height as string),
  maxHeight: addUnit(props.maxHeight as string)
}))

function handleScroll(e: Event) {
  if (wrapRef.value) {
    barRef.value.handleScroll(wrapRef.value)
    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    })
  }
}
function setScrollTop(num: number) {
  wrapRef.value!.scrollTop = num
}
function setScrollLeft(num: number) {
  wrapRef.value!.scrollLeft = num
}

function update() {
  if (!wrapRef.value) return
  
  const offsetHeight = wrapRef.value.offsetHeight
  const offsetWidth = wrapRef.value.offsetWidth

  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth

  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)

  ratioY.value = height / offsetHeight
  ratioX.value = width / offsetWidth

  sizeHeight.value = height < offsetHeight ? `${height}px` : ''
  sizeWidth.value = width < offsetWidth ? `${width}px` : ''
}

provide(ScrollbarContextKey, {
  setScrollTop,
  setScrollLeft,
  wrapRef
})

watch(() => [props.height, props.maxHeight], () => {
  if (!props.native)
    nextTick(() => {
      update()
      if (wrapRef.value) {
        barRef.value?.handleScroll(wrapRef.value)
      }
    })
})

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update()
    })
})
onUpdated(() => update())

defineExpose({
  update,
  setScrollTop,
  setScrollLeft,
  handleScroll,
  wrapRef
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
