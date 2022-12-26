<template>
  <div :class="[n()]" v-on="events">
    <slot></slot>
    <Transition name="van-tooltip-fade">
      <div v-if="visible" :class="[n('content'), `is-` + effect]" :data-side="placement">
        <slot name="content">{{ content }}</slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TooltipProps } from './tooltip'
defineOptions({
  name: 'VanTooltip'
})

defineProps(TooltipProps)

const { n, classes } = createNamespace('tooltip')
const visible = ref(false)
const events = {
  mouseenter() {
    visible.value = true
  },
  mouseleave() {
    visible.value = false
  }
}
</script>

<style lang="less">
@import './tooltip.less';
</style>
