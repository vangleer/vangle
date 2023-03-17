<template>
  <div :class="[n()]" @mouseup.stop>
    <div :class="[n('wrapper')]">
      <div :class="[n('body')]">
        <div :class="[n('header')]">
          <span :class="n('prev-btn')">
            <button :class="n('icon-btn')" @click="change('year', -1)">
              <VanIcon name="d-arrow-left" />
            </button>
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
            <button :class="n('icon-btn')" @click="change('year', 1)">
              <VanIcon name="d-arrow-right" />
            </button>
          </span>
        </div>
        <div :class="[n('content')]">
          <DateTable :date="insertDate" @pick="handlePick" />
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
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
defineOptions({
  name: 'VanPickerPanel'
})

const props = withDefaults(defineProps<{
  date: Dayjs
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

function change(type: ManipulateType, num: number) {
  insertDate.value = dayjs(insertDate.value.toDate()).add(num, type)
}

watch(() => props.date, () => {
  insertDate.value = dayjs(props.date.toDate())
}, { immediate: true })
</script>

