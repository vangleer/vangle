<template>
  <button>
    
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { CheckboxProps } from './checkbox'
defineOptions({
  name: 'VanCheckboxButton'
})

const props = defineProps(CheckboxProps)
const emit = defineEmits(['update:modelValue'])
const { n } = createNamespace('checkbox-button')

const checked = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const handleChecked = () => {
  if (props.disabled) return
  checked.value = !checked.value
}
</script>

<style lang="less">
@import './checkbox.less';
</style>
