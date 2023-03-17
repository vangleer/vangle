<template>
  <table :class="n()">
    <tbody>
      <tr>
        <th v-for="item in WEEKS" :aria-label="item + ''" scope="col">
          {{ item }}
        </th>
      </tr>
      <tr v-for="row, rowKey in rows" :key="rowKey">
        <td v-for="col, colKey in row" :key="`${rowKey + colKey}`">
          <div
            :class="[
              n('cell'),
              { disabled: col.disabled, current: col.current }
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
import { computed, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { DateCell } from '../date-picker'
import dayjs, { Dayjs } from 'dayjs'
defineOptions({
  name: 'VanPickerPanel'
})

const props = withDefaults(defineProps<{
  date: Dayjs,
  pickeDate: Dayjs
}>(), {
  date: () => dayjs(),
  pickeDate: () => dayjs()
})

const emit = defineEmits(['pick'])

const tableRows = ref<DateCell[][]>([[], [], [], [], [], []])

const WEEKS_CONSTANT = computed(() => props.date
  .locale('en')
  .localeData()
  .weekdaysShort()
  .map((_) => _.toLowerCase())
)
const WEEKS = computed(() => WEEKS_CONSTANT.value.map(w => w[0].toUpperCase() + w.substring(1)))
const startDate = computed(() => {
  const startDayOfMonth =  props.date.startOf('month')
  return startDayOfMonth.subtract(startDayOfMonth.day() || 7, 'day')
})
const rows = computed(() => {
  const rows_ = tableRows.value
  const cols = WEEKS.value.length
  const cur =  props.date
  const monthDstartDay = cur.startOf('month').day()
  const lastDate = cur.endOf('month').date()

  let count = 1
  for (let row = 0; row < tableRows.value.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cellDate = startDate.value.add(count, 'day')
      const text = cellDate.date()
      rows_[row][col] = {
        type: 'day',
        date: cellDate,
        text,
        current: cellDate.dayOfYear() === props.pickeDate.dayOfYear(),
        disabled: count < monthDstartDay || count - monthDstartDay >= lastDate
      }
      count++
    }
  }
  
  return rows_
})

const { n } = createNamespace('date-table')

function handlePick(cell: DateCell) {
  // date.value = cell.date as Dayjs
  emit('pick', cell)
}
</script>

<style lang="less">
.van-date-table {
  width: 100%;

  &__cell {
    text-align: center;

    &.disabled {
      color: var(--van-disabled-text-color);
      cursor: not-allowed;
    }

    &.current {
      .van-date-table__cell-text {
        color: var(--van-color-white);
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
      cursor: pointer;

      &:hover {
        color: var(--van-color-primary);
      }
    }
  }
}
</style>
