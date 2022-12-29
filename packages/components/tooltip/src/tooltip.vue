<template>
  <div ref="tooltipRef" :class="[n()]" v-on="events">
    <slot></slot>
    <Transition name="van-tooltip-fade">
      <div v-if="visible" :class="[n('content'), `is-${effect}`]" :style="contentStyle" :data-side="placement">
        <slot name="content">{{ content }}</slot>
        <span :class="n('arrow')"></span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, CSSProperties, watch, onMounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TooltipProps } from './tooltip'
defineOptions({
  name: 'VanTooltip'
})
const props = defineProps(TooltipProps)
const tooltipRef = ref<HTMLElement | null>(null)
const { n } = createNamespace('tooltip')
const visible = ref(false)

const contentStyle = ref<CSSProperties>({})

watch(() => props.placement, () => {
  getStyle()
})

const events = {
  mouseenter() {
    visible.value = true
  },
  mouseleave() {
    visible.value = false
  }
}

onMounted(() => {
  getStyle()
})

function getStyle() {
  const tooltipRect = tooltipRef.value?.getBoundingClientRect()
  if (tooltipRect) {
    const [direction] = props.placement.split('-')

    if (['top', 'bottom'].includes(direction)) {
      const value = tooltipRect.height + 10
      const y = direction === 'top' ? -value : value
      contentStyle.value = {
        transform: `translate(-50%, ${y}px)`
      }
    } else {
      const value = tooltipRect.width + 10
      const x = direction === 'left' ? -value : value
      contentStyle.value = {
        transform: `translate(${x}px, 50%)`
      }
    }
  }
} 
</script>

<style lang="less">
@import './tooltip.less';
</style>
