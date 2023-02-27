<template>
  <li v-show="show" :class="[n('option'), { selected: selected, 'is-disabled': disabled }]" @click="handleClick">
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vangle/utils'
import { OptionProps, SelectContextKey } from './select'
defineOptions({
  name: 'VaOption'
})

const ctx = inject(SelectContextKey)
const props = defineProps(OptionProps)
const emit = defineEmits(['change'])

const { n } = createNamespace('select')

const selected = computed(() => ctx?.selectValue.value === props.value)

const show = computed(() => {
  return ctx?.filterable.value ? (props.value + '').indexOf(ctx?.selectValue.value + '') !== -1 : true
})

function handleClick() {
  if (props.disabled) return
  ctx?.onChange(props.value)
  emit('change', props.value)
}
</script>

<style lang="less">
@import './select.less';
</style>
