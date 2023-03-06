<template>
  <div :class="[n()]">
    <div
      ref="wrapRef"
      :class="[n('wrap'), !native && n('wrap--hidden-default'), `is-${direction}`]"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <div ref="viewRef" :class="n('view')">
        <slot></slot>
      </div>
    </div>
    <!-- <div :class="[n('bar'), `is-${info.direction}`]">
      <div :class="n('thumb')" :style="thumbStyle"></div>
    </div> -->
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
import { computed, CSSProperties, onMounted, ref } from 'vue'
import { createNamespace, addUnit } from '@vangle/utils'
import { ScrollbarProps } from './scrollbar'
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

const wrapStyle = computed(() => ({ height: addUnit(props.height as string) }))


const direction = ref('verticle')

function handleScroll(e: Event) {
  if (wrapRef.value) {
    barRef.value.handleScroll(wrapRef.value)
    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    })
  }
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

  console.log(ratioY.value, ratioX.value)
  console.log(sizeHeight.value, sizeWidth.value)
}

onMounted(() => {
  update()
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
