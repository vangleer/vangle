<template>
  <div :class="[n(), n(`--${type}`), n(`--${status}`)]" :style="styles">
    <div :class="n('bar')">
      <div :class="n('bar__outer')">
        <div :class="n('bar__inner')" :style="{ width: barWidth }">
          <div v-if="textInside" :class="n('bar__innerText')">
            <span>{{ text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!textInside" :class="n('text')">
      <VanIcon v-if="iconName" :name="iconName" />
      <template v-else>{{ text }}</template>
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
  return isFunction(props.format) ? props.format!(props.percentage!) : props.percentage + '%'
})

const styles = computed(() => {
  const color = getColor()
  return {
    '--van-progress-stroke-width': props.strokeWidth + 'px',
    ...color
  }
})

const barWidth = computed(() => props.percentage + '%')

function getColor(): CSSProperties {
  const style: CSSProperties | any = {}
  const colorKey = '--van-progress-stroke-color'
  if (props.color) {
    if (isString(props.color)) { // 如果是字符串直接设置即可
      style[colorKey] = props.color

    } if (Array.isArray(props.color)) { // 如果是数组
      const colors = [...props.color]
      // 将数组从小到大排序
      colors.sort((a, b) => a.percentage - b.percentage)
      // 找到第一个大于等于当前 percentage 的颜色项
      const colorItem = colors.find(c => c.percentage >= props.percentage!)
      if (colorItem) style[colorKey] = colorItem.color

    } else if (isFunction(props.color)) { // 是函数
      style[colorKey] = (props.color as Function)(props.percentage)
    }
  }

  return style
}
</script>

<style lang="less">
@import './progress.less';
</style>
