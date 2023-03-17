<template>
  <VanTooltip ref="tooltipRef" v-bind="tooltipProps">
    <VanInput prefix-icon="calendar" class="van-date-editor" v-model="value" placeholder="Pick a day" />
    <template #content>
      <VanPickerPanel :class="n()" :type="type" :date="date" @pick="handlePick" />
    </template>
  </VanTooltip>
</template>

<script lang="ts" setup>
import { reactive, computed, provide, ref, nextTick } from 'vue'
import { VanTooltip, VanInput } from '@vangle/components'
import VanPickerPanel from './components/picker-panel.vue'
import { createNamespace } from '@vangle/utils'
import { DateCell, DatePickerProps, DatePickerTypes, DatePickerContextKey } from './date-picker'

import dayjs, { Dayjs } from 'dayjs'
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
const tooltipRef = ref()
const tooltipProps = reactive<any>({
  effect: 'light',
  pure: true,
  trigger: 'click',
  transitionName: 'van-select-menu',
  popperClass: 'van-picker__popper'
})

const formats = {
  year: 'YYYY',
  month: 'YYYY-MM',
  date: 'YYYY-MM-DD'
}

const format = computed(() => {
  return props.format ? props.format : formats[props.type]
})

const date = computed<Dayjs>({
  get: () => props.modelValue ? dayjs(props.modelValue) : dayjs(),
  set: (val) => {
    const d = val.toDate()
    const value = props.valueFormat ? val.format(props.valueFormat) : d
    emit('update:modelValue', value)
    nextTick(() => {
      tooltipRef.value.close()
    })
  }
})
const value = computed(() => {
  const d = dayjs(props.modelValue)
  return d.isValid() ? d.format(format.value) : ''
})

function handlePick(cell: DateCell) {
  date.value = cell.date
}

provide(DatePickerContextKey, {
  date,
  disabledDate: props.disabledDate
})

</script>

<style lang="less">
@import './date-picker.less';
</style>
