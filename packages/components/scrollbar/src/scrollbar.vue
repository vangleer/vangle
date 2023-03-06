<template>
  <div
    :class="[n()]"
    @mouseenter="handleShow(true)"
    @mouseleave="handleShow(false)"
  >
    <div
      ref="wrapRef"
      :class="wrapClz"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <div ref="viewRef" :class="n('view')">
        <slot></slot>
      </div>
    </div>
    <Transition name="van-scrollbar-fade">
      <Bar
        v-show="showBar"
        ref="barRef"
        :verticle="verticle"
        :width="sizeWidth"
        :height="sizeHeight"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </Transition>
    
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
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
const showBar = ref(false)

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const ratioX = ref(1)
const ratioY = ref(1)

const wrapClz = computed(() => ([n('wrap'), !props.native && n('wrap--hidden-default'), props.verticle ? 'is-verticle' : 'is-horizontal']))
const wrapStyle = computed(() => ({ height: addUnit(props.height as string) }))

function handleScroll(e: Event) {
  if (wrapRef.value) {
    barRef.value.handleScroll(wrapRef.value)
    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    })
  }
}
function handleShow(show: boolean) {
  showBar.value = show
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
