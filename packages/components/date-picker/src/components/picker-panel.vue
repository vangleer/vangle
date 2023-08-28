<template>
  <div :class="[n()]" @mouseup.stop>
    <div :class="[n('wrapper')]">
      <div v-if="shortcuts && shortcuts.length" :class="[n('sidebar')]">
        <button v-for="item in shortcuts" :key="item.text" :class="n('shortcut')" @click="handleClick(item)">
          {{ item.text }}
        </button>
      </div>
      <div :class="[n('body')]">
        <div :class="[n('header')]">
          <span :class="n('prev-btn')">
            <button :class="n('icon-btn')" @click="change('year', -1)">
              <VanIcon name="d-arrow-left" />
            </button>
            <button v-if="type === 'date'" :class="n('icon-btn')" @click="change('month', -1)">
              <VanIcon name="arrow-left" />
            </button>
          </span>
          <div :class="[n('header-label')]">
            <button>{{ year }}</button>
            <button v-if="type === 'date'">{{ month }}</button>
          </div>
          <span :class="n('next-btn')">
            <button v-if="type === 'date'" :class="n('icon-btn')" @click="change('month', 1)">
              <VanIcon name="arrow-right" />
            </button>
            <button :class="n('icon-btn')" @click="change('year', 1)">
              <VanIcon name="d-arrow-right" />
            </button>
          </span>
        </div>
        <div :class="[n('content')]">
          <DateTable
            v-if="type === 'date'"
            :date="insertDate"
            @pick="handlePick"
          />
          <YearTable
            v-else-if="type === 'year'"
            :date="insertDate"
            @pick="handlePick"
          />
          <MonthTable
            v-else-if="type === 'month'"
            :date="insertDate"
            @pick="handlePick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { VanIcon } from '@vangle/components'
import { createNamespace } from '@vangle/utils'
import { DateCell } from '../date-picker'
import DateTable from './date-table.vue'
import YearTable from './year-table.vue'
import MonthTable from './month-table.vue'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
defineOptions({
  name: 'VanPickerPanel'
})
type Shortcut = { text: string, value: Date | Function }
const props = withDefaults(defineProps<{
  date: Dayjs,
  type: string,
  shortcuts: Array<Shortcut>
}>(), {
  date: () => dayjs()
})

const emit = defineEmits(['pick', 'change'])
const { n } = createNamespace('picker-panel')

const insertDate = ref(dayjs())

const year = computed(() => insertDate.value.get('year'))
const month = computed(() => insertDate.value.format('MMMM'))

function handlePick(cell: DateCell) {
  emit('pick', cell)
}

// 点击shortcut
function handleClick(item: Shortcut) {
  const d = typeof item.value === 'function' ? item.value() : item.value
  const cell: DateCell = { date: dayjs(d) }
  emit('pick', cell)
}

// 统一处理日期切换
function change(type: ManipulateType, num: number) {
  if (props.type === 'year') {
    insertDate.value = dayjs(insertDate.value.toDate()).add(num * 10, type)
  } else if (props.type === 'month') {
    insertDate.value = dayjs(insertDate.value.toDate()).add(num, 'year')
  } else {
    insertDate.value = dayjs(insertDate.value.toDate()).add(num, type)
  }
}

watch(() => props.date, () => {
  insertDate.value = dayjs(props.date.toDate())
}, { immediate: true })
</script>

