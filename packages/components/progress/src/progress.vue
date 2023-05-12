<template>
  <div :class="[n(), n(`--${type}`), n(`--${status}`)]" :style="styles">
    <template v-if="type === 'line'">
      <div :class="n('bar')">
        <div :class="n('bar__outer')">
          <div :class="n('bar__inner')" :style="{ width: barWidth }">
            <div v-if="showText && textInside" :class="n('bar__innerText')">
              <slot :percentage="percentage"><span>{{ text }}</span></slot>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText && !textInside" :class="n('text')">
        <slot :percentage="percentage">
          <VanIcon v-if="iconName" :name="iconName" />
          <template v-else>{{ text }}</template>
        </slot>
      </div>
    </template>
    <div v-else :class="n('circle')" :style="{ width: `${width}px`, height: `${width}px` }">
      <svg viewBox="0 0 100 100">
        <path
          :class="n('circle__track')"
          :d="trackPath"
          fill="none"
          stroke="var(--van-progress-track-color)"
          :stroke-width="strokeWidth"
          :style="trailPathStyle"
        />
        <path
          :class="n('circle__path')"
          :d="trackPath"
          fill="none"
          :opacity="percentage ? 1 : 0"
          stroke="var(--van-progress-stroke-color)"
          :stroke-linecap="strokeLinecap"
          :stroke-width="strokeWidth"
          :style="circlePathStyle"
        />
      </svg>
      <div v-if="showText" :class="n('text')">
        <slot :percentage="percentage">
          <VanIcon v-if="iconName" :name="iconName" />
          <template v-else>{{ text }}</template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { createNamespace, isFunction, isString } from '@vangle/utils'
import { ProgressProps, ProgressStatus } from './progress'
import { VanIcon } from '@vangle/components'

const iconMap: { [key in ProgressStatus]: string } = {
  success: 'circle-check',
  warning: 'warning',
  info: 'info-filled',
  danger: 'circle-close'
}
defineOptions({
  name: 'VanProgress'
})

const props = defineProps(ProgressProps)

const { n } = createNamespace('progress')

const iconName = computed(() => iconMap[props.status!] && iconMap[props.status!])

const text = computed(() => {
  return isFunction(props.format) ? props.format(props.percentage!) : props.percentage + '%'
})

const styles = computed(() => {
  const color = getColor(props.color)
  const trackColor = getColor(props.trackColor, '--van-progress-track-color')
  return {
    '--van-progress-stroke-width': props.strokeWidth + 'px',
    ...color,
    ...trackColor
  }
})

const barWidth = computed(() => props.percentage + '%')

const perimeter = computed(() => 2 * Math.PI * radius.value)

const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1))

const strokeDashoffset = computed(() => {
  const offset = (-1 * perimeter.value * (1 - rate.value)) / 2
  return `${offset}px`
})

const trailPathStyle = computed<CSSProperties>(() => ({
  strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
  strokeDashoffset: strokeDashoffset.value,
}))

const circlePathStyle = computed<CSSProperties>(() => ({
  strokeDasharray: `${
    perimeter.value * rate.value * (props.percentage! / 100)
  }px, ${perimeter.value}px`,
  strokeDashoffset: strokeDashoffset.value,
  transition:
    'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s',
}))

const relativeStrokeWidth = computed(() =>
  ((props.strokeWidth / props.width) * 100).toFixed(1)
)

const radius = computed(() => {
  if (['circle', 'dashboard'].includes(props.type)) {
    return Number.parseInt(
      `${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`,
      10
    )
  }
  return 0
})

const trackPath = computed(() => {
  const r = radius.value
  const isDashboard = props.type === 'dashboard'
  return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
          `
})

function getColor(colorData: typeof props.color, colorKey?: string): CSSProperties {
  const style: CSSProperties | any = {}
  colorKey = colorKey || '--van-progress-stroke-color'
  if (colorData) {
    if (isString(colorData)) { // 如果是字符串直接设置即可
      style[colorKey] = colorData

    } if (Array.isArray(colorData)) { // 如果是数组
      const colors = [...colorData]
      // 将数组从小到大排序
      colors.sort((a, b) => a.percentage - b.percentage)
      // 找到第一个大于等于当前 percentage 的颜色项
      const colorItem = colors.find(c => c.percentage >= props.percentage!)
      if (colorItem) style[colorKey] = colorItem.color

    } else if (isFunction(colorData)) { // 是函数
      style[colorKey] = colorData(props.percentage!)
    }
  }

  return style
}
</script>

<style lang="less">
@import './progress.less';
</style>
