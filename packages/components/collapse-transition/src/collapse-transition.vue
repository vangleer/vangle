<template>
  <transition :name="n()" v-on="on">
    <slot />
  </transition>
</template>
<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import type { RendererElement } from 'vue'

defineOptions({
  name: 'VanCollapseTransition',
})

const { n } = createNamespace('collapse-transition')
const on = {
  beforeEnter(el: RendererElement) {
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.maxHeight = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },

  enter(el: RendererElement) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.maxHeight = 0
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  },

  afterEnter(el: RendererElement) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  beforeLeave(el: RendererElement) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.maxHeight = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave(el: RendererElement) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },

  afterLeave(el: RendererElement) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  },
}
</script>
<style>
.collapse-transition {
  transition: var(--van-transition-duration) height ease-in-out,
    var(--van-transition-duration) padding-top ease-in-out,
    var(--van-transition-duration) padding-bottom ease-in-out;
}

.van-collapse-transition-leave-active,
.van-collapse-transition-enter-active {
  transition: var(--van-transition-duration) max-height ease-in-out,
    var(--van-transition-duration) padding-top ease-in-out,
    var(--van-transition-duration) padding-bottom ease-in-out;
}
</style>