
在工作中，经常需要使用日期选择器来让用户方便地选择日期。今天我们将一起实现一个日期选择器组件。

本文可以看作是之前介绍的文章 [一起来封装一个弹出层（popper/tooltip）组件吧](https://juejin.cn/post/7265566737386553359) 的姊妹篇。在 Element Plus 中，类似触发式弹出层的组件都依赖于一个内部的 Popper 组件。有了 Popper 组件之后，封装类似功能的组件，如选择框（select）、下拉菜单（dropdown）、日期选择器（date-picker）等，都会变得更加容易，我们只需关注这些组件各自的实现细节即可。

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

废话不多说，让我们开始吧！

## 先来看看今天要实现的效果


![05.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38a08c62267f45558a13ca6291a8c74a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=645&h=301&e=gif&f=104&b=f5f8fb)

## 基础布局

popper和日期选择器对应的元素

*   触发器：也就是输入框

*   弹出层：日期面板


![06.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d18d2b6fdb54a82b250d71bf4c1c578~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=347&h=323&e=png&b=fefefe)

看看下面的基础布局，为了简化对时间的操作，这里使用dayjs

**date-picker.ts**

```typescript
// date-picker.ts
import { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import type { Dayjs } from 'dayjs'


export const DatePickerProps = {
  modelValue: [String, Number, Date],
  format: String,
  valueFormat: String,
  disabledDate: {
    type: Function as PropType<(time: Date) => boolean>
  },
  placeholder: String,
  type: {
    type: String as PropType<'date' | 'year' | 'month'>,
    default: 'date'
  },
  shortcuts: {
    type: Array as PropType<Array<{ text: string, value: Date | Function }>>,
    default: () => []
  },
  prefixIcon: {
    type: String,
    default: 'calendar'
  }
}

export type DatePickerTypes = ExtractPropTypes<typeof DatePickerProps>
export const DatePickerContextKey: InjectionKey<{
  date: Ref<Dayjs>,
  disabledDate?: (time: Date) => boolean
}> = Symbol('DatePickerContextKey')

export type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
export interface DateCell {
  text?: number
  disabled?: boolean
  isSelected?: boolean
  isCurrent?: boolean
  date: Dayjs,
  type?: DateCellType
}
```

**date-picker.vue**

```html
<template>
  <VanTooltip ref="tooltipRef" v-bind="tooltipProps">
    <div class="van-date-editor">
      <VanInput
        v-model="value"
        :prefix-icon="!$slots['prefix-icon'] ? prefixIcon : ''"
        :placeholder="placeholder"
        clearable
      >
        <template #prefix>
          <slot name="prefix-icon" />
        </template>
      </VanInput>
    </div>
    <template #content>
      <VanPickerPanel :class="n()" :type="type" :date="date" @pick="handlePick" :shortcuts="shortcuts" />
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
  (e: 'change', val: Date | string | number): void
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
    // 格式化日期
    const value = props.valueFormat ? val.format(props.valueFormat) : d
    // 触发事件
    emit('update:modelValue', value)
    emit('change', value)

    // 关闭弹出层
    nextTick(() => {
      tooltipRef.value.close()
    })
  }
})

const value = computed({
  get: () => {
    const d = dayjs(props.modelValue)
    return d.isValid() ? d.format(format.value) : ''
  },
  set: (val) => {
    // 将输入的值转换为dayjs日期
    const d = dayjs(val)

    // 如果不是合格的日期不做操作
    if (!d.isValid()) return
    // 格式化日期
    const value = props.valueFormat ? d.format(props.valueFormat) : d.toDate()
    emit('update:modelValue', value)
    emit('change', value)
  }
})

// 选择事件监听
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
```

1.  在这个日期选择器组件中，使用了 `VanTooltip` 组件来作为触发器和弹出层的容器。这实际上是对 Popper 组件的进一步封装。直接用 Popper 替换也可。

2.  由于在代码中使用了 Dayjs 的一些额外功能，比如扩展插件，所以在开始使用 Dayjs 的功能之前，通过 `dayjs.extend()` 方法注册了这些扩展。这确保了我们可以在组件中使用这些功能。

3.  定义了两个计算属性date和value，date用于日期选择面板，value用于输入框

4.  在 `VanTooltip` 组件的 `content` 插槽中，嵌入了 `VanPickerPanel` 组件，即日期选择面板。这个面板负责显示日期的选择界面，包括日期单元格、快捷方式等。

## PickerPanel 选择面板

之所以再抽离一个面板出来，主要是有一些公共的部分。例如日期前后切换和快捷方式等


![01.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3558c2e29dc41b28b57c763b68e547c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=329&h=356&e=png&b=fefefe)

```html
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
```

1.  布局分为左右两部份，左边是`shortcuts`，右侧是日期选择器的主体。

2.  在主体中分为header和content，header中定义日期切换元素，根据type的不同有不同的显示效果。

3.  `shortcuts`传入的格式如下，value可以是日期对象或者一个函数返回一个日期对象。因此在 `handleClick` 点击`chortcuts`时，对其进行了处理。

```typescript
const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
```

4.  定义change函数统一处理日期切换功能，得益于dayjs的完美封装，让这个函数格外简单

上面写了这么多都是在搭建整体的架子，可能部分读者还不清楚到底是在干啥，接下来我们就进入日期面板的主体封装，就是上面根据类型显示的几个组件 `DateTable`、`MonthTable`、`YearTable`

## DateTable、MonthTable、YearTable 封装

### DateTable


![02.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06b7f95d469f4cf9b09293fdab523634~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=322&h=353&e=png&b=ffffff)

**date-table.vue**

```html
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
```

1.  首先使用dayjs获取到WEEKS，也就是表头数据（星期的名称）
2.  日期表格为6行7列，42个天数
3.  使用计算属性得到开始的日期 `startDate`，例如：这个月第一天是礼拜3，那么表格开始日期就要往前退3天，使用dayjs的subtract减去就得到开始日期
4.  rows 为表格的真实数据，每次date改变都会重新计算得到根据当前date的表格数据
5.  `handlePick` 点击日期后触发 pick 事件并把cell对象传递过去。在上面panel中有对pick事件的监听

cell类型如下

```typescript
export interface DateCell {
  text?: number
  disabled?: boolean
  isSelected?: boolean
  isCurrent?: boolean
  date: Dayjs,
  type?: DateCellType
}
```

### MonthTable 组件


![03.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8edd20e3bf094404a94c6094ea65ea22~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=295&h=312&e=png&b=fefefe)

**month-table.vue**

```html
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
```

月份选择组件相对简单

1.  MONTHS 使用dayjs获取到所有月份的简写
2.  布局中循环3行4列，使用 `getIndex` 获取对应的索引
3.  点击选择时 `handlePick` 中拼装cell对象，这里只有date属性是必须项

### YearTable 组件


![04.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dccff7a70ae4cbc8e368313a4704a29~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=292&h=332&e=png&b=ffffff)

**year-table.vue**

```html
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
```

思路和MonthTable组件差不多，也是3行4列，提供当前年的10个选项

## 最后

本文拆分为3个部分讲解了日期选择组件的封装

第一部分：使用tooltip组件声明触发器（输入框）和弹出层（日期面板）
第二部分：由于面板涉及一些公共部分，我们又将其进行了拆分，将shortcuts和切换日期等公共功能放在面板里，而对于日期表格进行了单独的封装
第三部分：分别实现日期、月份、年份等表格展示

关于各组件的样式并没有在文中呈现，有需要的小伙伴可以到 github 仓库查看
