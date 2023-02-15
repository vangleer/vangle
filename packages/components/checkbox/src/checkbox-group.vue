<template>
  <div :class="n()">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide } from 'vue'
import { createNamespace } from '@vangle/utils'
import { CheckboxGroupProps, checkboxGroupContextKey, CheckboxGroupValueType } from './checkbox'
defineOptions({
  name: 'VanCheckboxGroup'
})

const props = defineProps(CheckboxGroupProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('checkbox-group')

const modelValue: any = computed({
  get() {
    return props.modelValue as any
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  }
})

function changeEvent(val: CheckboxGroupValueType) {
  emit('update:modelValue', val)
  emit('change', val)
}
provide(checkboxGroupContextKey, {
  ...props,
  modelValue,
  changeEvent
} as any)

</script>

<style lang="less">
@import './checkbox.less';
</style>
