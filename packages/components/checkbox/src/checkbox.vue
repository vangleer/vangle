<template>
  <label :class="[n(), { 'is-checked': checked, 'is-disabled': disabled, 'is-indeterminate': indeterminate }]" @click.stop>
    <span :class="[n('input')]">
      <input :class="[n('original')]" type="checkbox" :value="checked" :disabled="disabled">
      <span :class="n('inner')" @click="handleChecked"></span>
    </span>

    <span :class="[n('label')]" @click="handleChecked">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vangle/utils'
import { CheckboxProps, checkboxGroupContextKey } from './checkbox'
defineOptions({
  name: 'VanCheckbox'
})

const props = defineProps(CheckboxProps)
const emit = defineEmits(['update:modelValue'])
const { n } = createNamespace('checkbox')
const parent = inject(checkboxGroupContextKey, undefined)
const checked = computed({
  get: () => {
    if (parent && parent.group) {
      const group: any = parent
      return group.modelValue?.value.some((item: any) => item === props.label)
    } else {
      return props.modelValue
    }
  },
  set: (val) => {
    if (parent && parent.group) {
      const group: any = parent
      if (!val) {
        const index = group.modelValue?.value.findIndex((item: any) => item === props.label)
        group.modelValue?.value.splice(index, 1)
      } else {
        group.modelValue?.value.push(props.label)
      }
    }
    emit('update:modelValue', val)
  }
})


const handleChecked = () => {
  if (props.disabled) return
  const newValue = !checked.value
  checked.value = newValue
}
</script>

<style lang="less">
@import './checkbox.less';
</style>
