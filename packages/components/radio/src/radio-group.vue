<template>
  <div :class="[n()]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { createNamespace } from '@vangle/utils'
import { RadioGroupProps, LabelType, RadioGroupContextKey } from './radio'
defineOptions({
  name: 'VanRadioGroup'
})

const props = defineProps(RadioGroupProps)

const emit = defineEmits(['update:modelValue', 'change'])

const { n } = createNamespace('radio-group')
const activeLabel = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})

function handleChange(val: LabelType) {
  activeLabel.value = val
  emit('change', val)
}

provide(RadioGroupContextKey, {
  disabled: props.disabled,
  textColor: props.textColor,
  fill: props.fill,
  activeLabel,
  handleChange
})
</script>

<style lang="less">
@import './radio.less';
</style>
