<template>
  <i :class="[n()]" :style="style">
    <use v-html="icon"></use>
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { createNamespace, isUndefined, addUnit } from '@vangle/utils'
import { IconProps, getIcon } from './icon'
defineOptions({
  name: 'VanIcon'
})

const props = defineProps(IconProps)

const { n } = createNamespace('icon')
const icon = computed(() => getIcon(props.name))
const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}

  return {
    fontSize: isUndefined(props.size) ? undefined : addUnit(props.size),
    '--color': props.color,
  }
})
</script>

<style lang="less">
@import './icon.less';
</style>
