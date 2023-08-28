<template>
  <table :class="n()">
    <tbody>
      <tr v-for="row in 3" :key="row">
        <td
          v-for="col in 4"
          :key="`${row + '_' + col}`"
          @click="handlePick(row, col)"
        >
          <div
            :class="[
              n('cell'), { selected: isSelect(row, col) }
            ]"
          >
            <span :class="n('cell-text')">{{ MONTHS[getIndex(row, col)] }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vangle/utils'
import { DatePickerContextKey } from '../date-picker'
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

const datePicker = inject(DatePickerContextKey)

const { n } = createNamespace('month-table')
// 得到所有月份的简写
const MONTHS = computed(() => props.date.locale('en').localeData().monthsShort())

// 选择对应的月份
function handlePick(row: number, col: number) {
  const month = getIndex(row, col)
  if (month) {
    // 拼装cell对象
    const cell = {
      date: dayjs(props.date.set('month', month))
    }
    // 触发picker事件
    emit('pick', cell)
  }
}

function isSelect(row: number, col: number) {
  return datePicker?.date.value.year() === props.date.year() && datePicker?.date.value.format('MMM') === MONTHS.value[getIndex(row, col)]
}

// 计算索引
function getIndex(row: number, col: number) {
  return (row - 1) * 4 + col - 1
}

</script>

<style lang="less">
@N: van-month-table;
.@{N} {
  width: 100%;
  color: var(--van-text-color-regular);
  &__cell {
    text-align: center;
    &.selected {
      color: var(--van-color-primary);
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
    padding: 20px 0;
    &:hover {
      color: var(--van-color-primary);
    }
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
