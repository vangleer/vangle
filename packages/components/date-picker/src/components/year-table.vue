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
            <span :class="n('cell-text')">{{ getText(row, col) }}</span>
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
const currentYear = computed(() => props.date.year())
const currentNumber = computed(() => props.date.year() % 10)
const datePicker = inject(DatePickerContextKey)

const { n } = createNamespace('year-table')

function handlePick(row: number, col: number) {
  const year = getText(row, col)
  if (year) {
    const cell = {
      date: dayjs(props.date.set('year', year))
    }
    emit('pick', cell)
  }
}

function isSelect(row: number, col: number) {
  return datePicker?.date.value.year() === getText(row, col)
}

function getText(row: number, col: number) {
  const n = (row - 1) * 4 + col - 1
  if (n >= 10) return
  return currentYear.value + n - currentNumber.value
}

</script>

<style lang="less">
@N: van-year-table;
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
