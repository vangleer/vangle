<template>
  <div :class="[n(), { 'is-checked': checked, 'is-disabled': disabled }]" @click="handleChange" :style="style">
    <input v-model="checked" :class="n('input')" type="checkbox" :disabled="disabled">
    <template v-if="!inlinePrompt && inactiveText">
      <span :class="n('label--left')">{{ inactiveText }}</span>
    </template>
    <span :class="n('core')">
      <span v-if="inlinePrompt" :class="n('inner')">
        <span class="is-text">{{ text }}</span>
      </span>
      <div :class="n('action')">
        <VanIcon v-if="loading" :class="{ 'is-loading': loading }" name="loading" />
      </div>
    </span>
    <template v-if="!inlinePrompt && activeText">
      <span :class="n('label--right')">{{ activeText }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace, addUnit } from '@vangle/utils'
import { SwitchProps } from './switch'
import VanIcon from '../../icon'
defineOptions({
  name: 'VanSwitch'
})

const props = defineProps(SwitchProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('switch')

const checked = computed({
  get: () => props.modelValue === props.activeValue,
  set: (val) => {
    emit('update:modelValue', val ? props.activeValue : props.inactiveValue)
    emit('change', val ? props.activeValue : props.inactiveValue)
  }
})

const style = computed(() => {
  if (props.width) {
    return { width: addUnit(props.width) }
  }
})

const text = computed(() => {
  if (!props.inlinePrompt) return ''
  return checked.value ? props.activeText : props.inactiveText
})

function handleChange() {
  if (props.disabled) return
  checked.value = !checked.value
}
</script>

<style lang="less">
@import './switch.less';
</style>
