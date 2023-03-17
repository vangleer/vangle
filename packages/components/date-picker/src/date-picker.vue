<template>
  <VanTooltip v-bind="tooltipProps">
    <VanInput class="van-date-editor" v-model="value" placeholder="Pick a day" />
    <template #content>
      <VanPickerPanel :class="n()" :date="date" @pick="handlePick" />
    </template>
  </VanTooltip>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { VanTooltip, VanInput } from '@vangle/components'
import VanPickerPanel from './components/picker-panel.vue'
import { createNamespace } from '@vangle/utils'
import { DateCell, DatePickerProps, DatePickerTypes } from './date-picker'

import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import localeData from 'dayjs/plugin/localeData.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(dayOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
defineOptions({
  name: 'VanDatePicker'
})

const props = defineProps(DatePickerProps)

const emit = defineEmits<{
  (e: 'update:modelValue', val: DatePickerTypes['modelValue']): void
}>()

const { n } = createNamespace('date-picker')
const tooltipProps = reactive<any>({
  effect: 'light',
  pure: true,
  trigger: 'click',
  transitionName: 'van-select-menu',
  popperClass: 'van-picker__popper'
})

const date = computed<Dayjs>({
  get: () => props.modelValue ? dayjs(props.modelValue) : dayjs(),
  set: (val) => {
    const d = val.toDate()
    const value = props.valueFormat ? val.format(props.valueFormat) : d
    emit('update:modelValue', value)
  }
})
const value = computed(() => {
  const d = dayjs(props.modelValue)
  return d.isValid() ? d.format(props.format) : ''
})

function handlePick(cell: DateCell) {
  date.value = cell.date
}

</script>

<style lang="less">
@import './date-picker.less';
</style>
