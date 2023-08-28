<template>
  <table :class="n()">
    <tbody>
      <tr>
        <th v-for="item in WEEKS" :aria-label="item + ''" scope="col">
          {{ item }}
        </th>
      </tr>
      <tr v-for="row, rowKey in rows" :key="rowKey">
        <td
          v-for="col, colKey in row"
          :key="`${rowKey + colKey}`"
          :class="[col.type, { disabled: col.disabled }]"
        >
          <div
            :class="[
              n('cell'), { selected: col.isSelected }
            ]"
            @click="handlePick(col)"
          >
            <span :class="n('cell-text')">{{ col.text }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { computed, ref, inject } from 'vue'
import { createNamespace, isFunction } from '@vangle/utils'
import { DateCell, DatePickerContextKey, DateCellType } from '../date-picker'
import dayjs, { Dayjs } from 'dayjs'
defineOptions({
  name: 'VanPickerPanel'
})
const props = withDefaults(defineProps<{
  date: Dayjs
}>(), {
  date: () => dayjs()
})

const emit = defineEmits(['pick'])
// panel 中注入的数据
const datePicker = inject(DatePickerContextKey)
// 面板行数
const tableRows = ref<DateCell[][]>([[], [], [], [], [], []])

const WEEKS_CONSTANT = computed(() => props.date
  .locale('en')
  .localeData()
  .weekdaysShort()
  .map((_) => _.toLowerCase())
)

// 表头数据
const WEEKS = computed(() => WEEKS_CONSTANT.value.map(w => w[0].toUpperCase() + w.substring(1)))

// 表格开始日期
const startDate = computed(() => {
  const startDayOfMonth =  props.date.startOf('month')
  return startDayOfMonth.subtract(startDayOfMonth.day() || 7, 'day')
})

// 表格数据
const rows = computed(() => {
  const rows_ = tableRows.value
  const cols = WEEKS.value.length

  // 当前选中的日期
  const cur =  props.date
  // 当月第一天
  const monthDstartDay = cur.startOf('month').day()
  // 当月最后一天
  const lastDate = cur.endOf('month').date()

  let count = 1
  // 循环填充表格，6行7列
  for (let row = 0; row < tableRows.value.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cellDate = startDate.value.add(count, 'day')
      const text = cellDate.date()
      
      // 是否选中
      const disabled = isFunction(datePicker?.disabledDate) && datePicker!.disabledDate(cellDate.toDate())
      
      // 默认当月日期
      const isSelected = cellDate.format('YYYY-MM-DD') === datePicker?.date.value.format('YYYY-MM-DD')
      let type: DateCellType = 'normal'
      if (count < monthDstartDay) { // 上个月日期
        type = 'prev-month'
      } else if (count - monthDstartDay >= lastDate) { // 下个月日期
        type = 'next-month'
      }
      rows_[row][col] = {
        type,
        date: cellDate,
        text,
        isSelected,
        disabled
      }
      count++
    }
  }
  
  return rows_
})

const { n } = createNamespace('date-table')

function handlePick(cell: DateCell) {
  if (cell.disabled) return
  emit('pick', cell)
}
</script>

<style lang="less">
@N: van-date-table;
.@{N} {
  width: 100%;
  color: var(--van-text-color-regular);
  &__cell {
    text-align: center;
    &.selected {
      color: var(--van-color-white);
      .van-date-table__cell-text {
        background-color: var(--van-color-primary);
      }
    }
    &-text {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  td {
    cursor: pointer;
    &:hover {
      color: var(--van-color-primary);
    }
  }
  .prev-month, .next-month {
    color: var(--van-disabled-text-color);
  }

  .disabled {
    cursor: not-allowed;
    background-color: var(--van-disabled-bg-color);
    &:hover {
      color: var(--van-disabled-text-color);
    }
  }
}
</style>
