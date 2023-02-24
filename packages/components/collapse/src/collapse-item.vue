<template>
  <div :class="[n(), { 'is-active': show, 'is-disabled': disabled }]">
    <div :class="[n('tab')]" @click="handleClick">
      <div :class="[n('tab__head')]">
        <slot name="title">{{ title }}</slot>
        <VanIcon :class="[n('arrow'), { 'is-active': show }]" name="arrow-right" />
      </div>
    </div>
    <Transition name="van-collapse" v-on="on">
      <div v-show="show" :class="[n('wrap')]">
        <div :class="[n('content')]">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { collapseContextKey } from './collapse'
import { VanIcon } from '../../icon'
defineOptions({
  name: 'VanCollapseItem'
})

const ctx = inject(collapseContextKey)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  name: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean
  }
})

const show = computed(() => ctx?.activeNames.value.includes(props.name))

const { n } = createNamespace('collapse-item')

function handleClick() {
  if (props.disabled) return
  // show.value = !show.value
  ctx?.handleItemClick(props.name)
}

const on = {
  beforeEnter(el: HTMLElement) {
    el.style.height = '0px'
  },
  enter(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
    } else {
      el.style.height = '0px'
    }
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.height = '0px'
    }
  }
}
</script>

<style lang="less">
@import './collapse.less';
</style>
