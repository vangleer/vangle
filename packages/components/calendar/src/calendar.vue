<template>
  <div :class="n()">
    <div :class="n('header')">
      <span :class="n('prev-btn')">
        <button :class="n('icon-btn')" @click="change('month', -1)">
          <VanIcon name="arrow-left" />
        </button>
      </span>
      <div :class="[n('header-label')]">
        <button>{{ year }}</button>
        <button>{{ month }}</button>
      </div>
      <span :class="n('next-btn')">
        <button :class="n('icon-btn')" @click="change('month', 1)">
          <VanIcon name="arrow-right" />
        </button>
      </span>
    </div>
    <div :class="n('body')">
      <table :class="n('table')" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <th v-for="item in WEEKS" :aria-label="item + ''" scope="col">
              {{ item }}
            </th>
          </tr>
          <tr v-for="row, rowKey in rows" :key="rowKey">
            <td v-for="col, colKey in row" :key="`${rowKey + colKey}`" :class="[col.type, { disabled: col.disabled }]">
              <div :class="[
                n('table-cell'), { selected: col.isSelected }
              ]" @click="handleCellClick(col)">
                <slot name="date-cell" v-bind="col">
                  <span :class="n('table-cell-text')">{{ col.text }}</span>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { CalendarProps, DateCell, DateCellType } from './calendar'
import { VanIcon } from '@vangle/components'
defineOptions({
  name: 'VanCalendar'
})

const props = defineProps(CalendarProps)

const { n } = createNamespace('calendar')

import { computed, ref } from 'vue'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'

import localeData from 'dayjs/plugin/localeData.js'

dayjs.extend(localeData)

const emit = defineEmits(['update:modelValue'])

const year = computed(() => date.value.get('year'))
const month = computed(() => date.value.format('MMMM'))

const selectedDay = ref<Dayjs>()

const date = computed<Dayjs>({
  get: () => {
    return props.modelValue ? dayjs(props.modelValue) : dayjs(selectedDay.value)
  },
  set: (val) => {
    if (!val) return
    selectedDay.value = val
    const d = val.toDate()
    emit('update:modelValue', d)
  }
})
const tableRows = ref<DateCell[][]>([[], [], [], [], [], []])

const WEEKS_CONSTANT = computed(() => date.value
  .locale('en')
  .localeData()
  .weekdaysShort()
  .map((_) => _.toLowerCase())
)
const WEEKS = computed(() => WEEKS_CONSTANT.value.map(w => w[0].toUpperCase() + w.substring(1)))

const startDate = computed(() => {
  const startDayOfMonth = date.value.startOf('month')
  return startDayOfMonth.subtract(startDayOfMonth.day() || 7, 'day')
})
const rows = computed(() => {
  const rows_ = tableRows.value
  const cols = WEEKS.value.length
  const cur = date.value
  const monthDstartDay = cur.startOf('month').day()
  const lastDate = cur.endOf('month').date()

  let count = 1
  for (let row = 0; row < tableRows.value.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cellDate = startDate.value.add(count, 'day')
      const text = cellDate.date()

      const disabled = false

      const isSelected = cellDate.format('YYYY-MM-DD') === date.value.format('YYYY-MM-DD')
      let type: DateCellType = 'normal'
      if (count < monthDstartDay) {
        type = 'prev-month'
      } else if (count - monthDstartDay >= lastDate) {
        type = 'next-month'
      }
      rows_[row][col] = {
        type,
        date: cellDate,
        text,
        isSelected,
        disabled,
        day: cellDate.format('YYYY-MM-DD')
      }
      count++
    }
  }

  return rows_
})

function handleCellClick(cell: DateCell) {
  date.value = cell.date
}

function change(type: ManipulateType, num: number) {
  if (props.type === 'year') {
    date.value = dayjs(date.value.toDate()).add(num * 10, type)
  } else if (props.type === 'month') {
    date.value = dayjs(date.value.toDate()).add(num, 'year')
  } else {
    date.value = dayjs(date.value.toDate()).add(num, type)
  }
}
</script>

<style lang="less">
@import './calendar.less';
</style>
