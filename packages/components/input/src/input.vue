<template>
  <div :class="[n(), { 'is-disabled': disabled }]">
    <div
      :class="[n('wrapper'), { 'is-focus': focus }]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <span v-if="$slots.prefix || prefixIcon" :class="n('prefix')">
        <slot name="prefix"></slot>
        <VanIcon v-if="prefixIcon" :name="prefixIcon" />
      </span>
      <input
        ref="inputRef"
        v-model="value"
        :class="n('inner')"
        :type="cType"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :readonly="readonly"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        v-bind="$attrs"
      >
      <span v-if="showPassword || clearable" :class="n('suffix')">
        <template v-if="showPassword">
          <VanIcon :name="passwordView ? 'view' : 'hide'" @click="handleViewPassword" />
        </template>
        <VanIcon v-show="showClear" name="circle-close" @click.stop="clear" />
      </span>
      <span v-if="$slots.suffix || suffixIcon" :class="n('suffix')">
        <slot name="suffix"></slot>
        <VanIcon v-if="suffixIcon" :name="suffixIcon" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { InputProps } from './input'
import { VanIcon } from '../../icon'
defineOptions({
  name: 'VanInput'
})

const props = defineProps(InputProps)
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear'])
const { n } = createNamespace('input')
const inputRef = ref<HTMLInputElement>()
const focus = ref(props.autofocus)
const passwordView = ref(true)
const cType = ref(props.type)
const showClear = ref(false)
const value = computed<any>({
  get: () => props.modelValue,
  set: (val: any) => {
    emit('update:modelValue', val)
  }
})

const onFocus = () => {
  focus.value = true
  emit('focus')
}
const onBlur = () => {
  focus.value = false
  emit('blur')
}
const clear = () => {
  value.value = ''
  emit('clear')
}
const handleViewPassword = () => {
  if (props.type !== 'password') return
  passwordView.value = !passwordView.value
  if (!passwordView.value) {
    cType.value = 'text'
  } else {
    cType.value = props.type
  }
}

function handleMouseEnter() {
  showClear.value = props.clearable && value.value
}

function handleMouseLeave() {
  showClear.value = false
}

defineExpose({
  blur: () => inputRef.value?.blur(),
  focus: () => inputRef.value?.focus(),
  clear,
  input: () => inputRef.value
})
</script>

<style lang="less">
@import './input.less';
</style>
