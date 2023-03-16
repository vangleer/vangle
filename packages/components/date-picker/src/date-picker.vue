<template>
  <VanTooltip v-bind="tooltipProps">
    <VanInput class="van-date-editor" v-model="value" />
    <template #content>
      <VanPickerPanel :class="n()" />
    </template>
  </VanTooltip>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VanTooltip, VanInput } from '@vangle/components'
import VanPickerPanel from './picker-panel.vue'
import { createNamespace } from '@vangle/utils'
import { DatePickerProps } from './date-picker'
defineOptions({
  name: 'VanDatePicker'
})

defineProps(DatePickerProps)

const { n } = createNamespace('date-picker')
const tooltipProps = reactive<any>({
  effect: 'light',
  pure: true,
  trigger: 'click',
  transitionName: 'van-select-menu',
  popperClass: 'van-picker__popper'
})
const value = ref('')
</script>

<style lang="less">
@import './date-picker.less';
</style>
