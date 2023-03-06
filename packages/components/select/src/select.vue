<template>
  <div ref="selectRef" :class="[n(), { 'clearable': clearable }]">
    <VanTooltip v-bind="tooltipProps" :disabled="disabled">
      <div :class="n('trigger')" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
        <VanInput
          v-model="selectValue"
          :suffix-icon="suffixIcon"
          :clearable="clearable"
          :readonly="!filterable"
          :placeholder="placeholder"
          :disabled="disabled"
          @clear="handleMouseleave"
        />
      </div>
      <template #content>
        <div :class="[n('--dropdown')]" :style="contentStyle">
          <ul :class="[n('--list')]">
            <slot />
          </ul>
        </div>
      </template>
    </VanTooltip>
   </div>
</template>

<script lang="ts" setup>
import { ref, provide, computed, reactive } from 'vue'
import { createNamespace } from '@vangle/utils'
import VanInput from '../../input'
import { SelectContextKey, SelectProps, SelectValueType } from './select'
import VanTooltip from '../../tooltip'
defineOptions({
  name: 'VanSelect'
})
const props = defineProps(SelectProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('select')

const tooltipProps = reactive<any>({
  effect: 'light',
  pure: true,
  trigger: 'click',
  transitionName: 'van-select-menu'
})

const show = ref(false)
const suffixIcon = ref('arrow-down')
const selectValue = computed<SelectValueType>({
  get: () => props.modelValue,
  set(val: SelectValueType) {
    onChange(val)
  }
})
const showClear = ref(false)
const selectRef = ref<HTMLElement>()
const clearable = computed(() => showClear.value && props.clearable && !!props.modelValue)
const filterable = computed(() => props.filterable)

document.getElementById('1')?.getBoundingClientRect

const contentStyle = computed(() => {
  const width = selectRef.value?.getBoundingClientRect().width || 0
  return { minWidth: width + 'px' }
})

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

</script>

<style lang="less">
@import './select.less';
</style>
