<template>
  <VanPopper v-bind="popperProps" :nowrap="nowrap">
    <slot></slot>
    <template #content>
      <slot name="content">
        <span v-if="rawContent" v-html="content"></span>
        <template v-else>{{ content }}</template>
      </slot>
    </template>
  </VanPopper>
</template>

<script lang="ts" setup>
import { useAttrs, computed } from 'vue'
import { TooltipProps } from './tooltip'
import VanPopper, { PopperProps } from '../../popper'
import { useNowrap } from '../../popper/src/use-nowrap'
defineOptions({
  name: 'VanTooltip'
})
const props = defineProps(TooltipProps)
const attrs = useAttrs()

const pick = (sourceObj: any, keys: string[]) => {
  return keys.reduce((obj: any, key) => {
    obj[key] = sourceObj[key]
    return obj
  }, {})
}

const popperProps = computed(() => {
  return { ...attrs, ...pick(props, Object.keys(PopperProps)) }
})

const nowrap = useNowrap()
 
</script>

<style lang="less">
@import './tooltip.less';
</style>
