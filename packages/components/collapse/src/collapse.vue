<template>
  <div :class="[n()]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { CollapseProps, collapseContextKey, CollapseActiveName } from './collapse'
defineOptions({
  name: 'VanCollapse'
})

const props = defineProps(CollapseProps)
const emit = defineEmits(['update:modelValue', 'change'])
const { n } = createNamespace('collapse')

const activeNames = computed<CollapseActiveName[]>({
  get: () => {
    if (Array.isArray(props.modelValue) && !props.accordion) {
      return props.modelValue
    } else {
      return [props.modelValue]
    }
  },
  set: (val) => {
    if (props.accordion) {
      emit('update:modelValue', val[0])
    } else {
      emit('update:modelValue', [...val])
    }

    emit('change', val)
  }
})
// ref<CollapseActiveName[]>([])
const handleItemClick = (name: CollapseActiveName) => {
  const index = activeNames.value.findIndex(item => item === name)
  if (props.accordion) {
    activeNames.value = index === -1 ? [name] : []
  } else {
    if (index === -1) {
      activeNames.value = [...activeNames.value, name]
    } else {
      activeNames.value = activeNames.value.filter(item => item !== name)
    }
  }
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style lang="less">
@import './collapse.less';
</style>
