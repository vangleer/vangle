<template>
  <span v-if="noWrap" ref="triggerRef" class="van-popper__trigger" v-bind="$attrs">
    <slot />
  </span>
  <component v-else :ref="setTriggerRef" v-bind="$attrs" :is="$slots.default!" />
  <Teleport :to="`#${selector}`">
    <Transition :name="transitionName">
      <div
        v-if="visible"
        ref="contentRef"
        :class="['van-popper', `is-${effect}`, popperClass]"
        :style="contentStyle"
        :data-side="side"
        @mousedown.stop
      >
        <slot name="content">{{ content }}</slot>
        <span
          v-if="showArrow"
          ref="arrowRef"
          class="van-popper__arrow"
          :style="arrowStyle"
        >
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref, PropType, unref } from 'vue'
import { usePopperContainer, useFloating, useTrigger } from './popper'
import type { Placement, Strategy } from '@floating-ui/dom'
import { offset, arrow, shift, flip } from '@floating-ui/dom'
const props = defineProps({
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark'
  },
  content: {
    type: String
  },
  transitionName: {
    type: String,
    default: 'van-popper-fade'
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },
  strategy: {
    type: String as PropType<Strategy>,
    default: 'absolute',
  },
  showArrow: { // 是否显示箭头
    type: Boolean,
    default: true,
  },
  popperClass: {
    type: String,
    default: ''
  }
})
const { selector } = usePopperContainer()
const arrowRef = ref()
const middleware = computed(() => {
  const mds = [shift(), flip(), offset(10)]
  if (props.showArrow) {
    mds.push(arrow({ element: arrowRef.value }))
  }
  return mds
})

const placement = ref(props.placement)
const strategy = ref(props.strategy)
const {
  setTriggerRef,
  triggerRef,
  visible,
  noWrap
} = useTrigger()

const {
  x,
  y,
  contentRef,
  middlewareData,
  update
} = useFloating({ middleware, placement, strategy }, triggerRef)

const side = computed(() => {
  return placement.value.split('-')[0]
})
// 弹出框样式
const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
// 箭头样式
const arrowStyle = computed(() => {
  if (!props.showArrow) return {}
  const { arrow } = unref(middlewareData)
  return {
    left: arrow?.x + 'px',
    top: arrow?.y + 'px'
  }
})

</script>

<style lang="less">
@sides: {
  top: bottom;
  bottom: top;
  left: right;
  right: left;
}
@N: .van-popper;
@{N} {
  --van-arrow-size: 10px;
  --van-popper-content-bg: #fff;
  --van-popper-border: 1px solid #ebedf0;
  border-radius: 4px;
  color: #000;
  background-color: var(--van-popper-content-bg);
  padding: 10px 12px;
  border: var(--van-popper-border);
  position: absolute;
  white-space: nowrap;
  transition: opacity .3s;
  font-size: 13px;
  z-index: 1000;
  width: max-content;
  
  &__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--van-popper-content-bg);
    transform: rotate(45deg);
  }

  each(@sides, {
    &[data-side^='@{value}'] {
      @{N}__arrow {
        @{key}: -5px;
      }

      @{N}__arrow {
        border-@{key}: var(--van-popper-border);
      }

      @{N}__arrow when (@value =top) {
        border-right: var(--van-popper-border);
      }

      @{N}__arrow when (@value =bottom) {
        border-left: var(--van-popper-border);
      }

      @{N}__arrow when (@value =left) {
        border-top: var(--van-popper-border);
      }

      @{N}__arrow when (@value =right) {
        border-bottom: var(--van-popper-border);
      }
    }
  });

  &.is-dark {
    --van-popper-content-bg: #000;
    color: #fff;
    border: none;

    @{N}__arrow {
      border-color: transparent;
    }
  }
}

.van-popper-fade-enter-from,
.van-popper-fade-leave-to {
  opacity: 0;
}
</style>