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
  </div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, onMounted, ref } from 'vue'
import { createNamespace, addUnit } from '@vangle/utils'
import { ScrollbarProps } from './scrollbar'
defineOptions({
  name: 'VanScrollbar'
})

const props = defineProps(ScrollbarProps)

const { n } = createNamespace('scrollbar')
const wrapRef = ref<HTMLElement>()
const viewRef = ref<HTMLElement>()
const wrapStyle = computed(() => ({ height: addUnit(props.height as string) }))
const thumbStyle = ref<CSSProperties>({})

const direction = ref('verticle')

function handleScroll(e: Event) {
}

onMounted(() => {
  const wrapRect = wrapRef.value?.getBoundingClientRect()!
  const viewRect = viewRef.value?.getBoundingClientRect()!

  console.log(wrapRect, viewRect)
  if (wrapRect.width < viewRect.width) {
    direction.value = 'horizontal'
  } else if (wrapRect.height < viewRect.height) {
    direction.value = 'verticle'
  }

  console.log(direction.value, 'direction.valuedirection.valuedirection.value')
})
</script>

<style lang="less">
@import './scrollbar.less';
</style>
