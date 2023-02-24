<template>
  <label
    :class="[n(), { 'is-checked': checked, 'is-disabled': disabled, 'is-bordered': border }]"
    :style="style"
  >
    <span :class="[n('input')]">
      <input v-model="checked" type="radio" :disabled="disabled" :class="n('original')">
      <span :class="n('inner')"></span>
    </span>
    <span :class="[n('label')]">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vangle/utils'
import { RadioProps, RadioGroupContextKey } from './radio'

defineOptions({
  name: 'VanRadio'
})

const props = defineProps(RadioProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('radio')
const ctx = inject(RadioGroupContextKey, undefined)

const checked = computed({
  get: () => ctx ? ctx.activeLabel.value === props.label : props.modelValue === props.label,
  set: () => {
    if (ctx) {
      ctx.handleChange(props.label as any)
    } else {
      emit('update:modelValue', props.label)
    }

    emit('change', props.label)
  }
})

const disabled = computed(() => ctx ? ctx.disabled || props.disabled : props.disabled)
const style = computed(() => ctx && ({
  '--van-rodio-checked-bg-color': ctx.fill,
  '--van-radio-checked-text-color': ctx.textColor
}))
</script>

<style lang="less">
@import './radio.less';
</style>
