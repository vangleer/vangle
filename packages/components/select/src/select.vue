<template>
  <div :class="[n(), { 'clearable': clearable }]">
    <div :class="n('trigger')" @click.stop="handleFocus" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
      <VanInput
        v-model="selectValue"
        :suffix-icon="suffixIcon"
        :clearable="clearable"
        :readonly="!filterable"
        :placeholder="placeholder"
        :disabled="disabled"
        @clear="handleMouseleave"
        @input="handleInput"
      />
    </div>
    <Transition name="van-select-menu">
      <div v-show="show" :class="[n('content')]" @click.stop>
        <div :class="[n('menu')]">
          <ul :class="[n('list')]">
            <slot />
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, provide, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import VanInput from '../../input'
import { SelectContextKey, SelectProps, SelectValueType } from './select'
defineOptions({
  name: 'VanSelect'
})
const props = defineProps(SelectProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('select')

const show = ref(false)
const suffixIcon = ref('arrow-down')
const selectValue = computed<SelectValueType>({
  get: () => props.modelValue,
  set(val: SelectValueType) {
    onChange(val)
  }
})
const showClear = ref(false)
const clearable = computed(() => showClear.value && props.clearable && props.modelValue)
const filterable = computed(() => props.filterable)
function handleFocus() {
  if (props.disabled) return
  show.value = true
}
function onChange(value: SelectValueType) {
  emit('change', value)
  emit('update:modelValue', value)
  show.value = false
}

provide(SelectContextKey, {
  onChange,
  selectValue,
  filterable
})

function handleMouseenter() {
  if (props.disabled) return
  if (props.clearable && props.modelValue) {
    suffixIcon.value = ''
    showClear.value = true
  }
}

function handleMouseleave() {
  if (props.disabled) return
  if (props.clearable && props.modelValue) {
    suffixIcon.value = 'arrow-down'
    showClear.value = false
  }
}

function handleInput() {
  show.value = true
}

function handleOutside() {
  show.value = false
}
onMounted(() => {
  if (props.disabled) return
  document.addEventListener('click', handleOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutside)
})
</script>

<style lang="less">
@import './select.less';
</style>
