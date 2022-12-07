<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="dialog-fade">
      <VanOverlay v-if="visible" @click="onModalClick">
        <div ref="targetRef" :class="[n(), draggable && 'is-draggable']" :style="{ top, width }" @click.stop>
          <div ref="handleRef" :class="[n('header')]">
            <slot name="header" :close="doClose">
              <span :class="[n('title')]">{{ title }}</span>
              <button v-if="showClose" :class="[n('headerbtn')]" @click="onClose">
                <VanIcon name="close" />
              </button>
            </slot>
          </div>
          <div :class="[n('body')]">
            <slot />
          </div>
          <div v-if="$slots.footer" :class="[n('footer')]">
            <slot name="footer"></slot>
          </div>
        </div>
      </VanOverlay>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { useDraggable } from '../../../hooks/index'
import { DialogProps } from './dialog'
import { VanOverlay } from '../../overlay'
import { VanIcon } from '../../icon'
defineOptions({
  name: 'VanDialog'
})

const props = defineProps(DialogProps)
const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed'])
const { n } = createNamespace('dialog')
const targetRef = ref<HTMLElement | undefined>()
const handleRef = ref<HTMLElement | undefined>()

const visible = ref<boolean>(false)
const draggable = computed(() => props.draggable)
watch(() => props.modelValue, (val) => {
  if (val) {
    doOpen()
  } else {
    doClose()
  }
})

const doOpen = () => {
  emit('open')
  setTimeout(() => {
    visible.value = true
    emit('opened')
    emit('update:modelValue', visible.value)
  }, props.openDelay)
}

const doClose = () => {
  const hide = () => {
    setTimeout(() => {
      visible.value = false
      emit('closed')
      emit('update:modelValue', visible.value)
    }, props.closeDelay)
  }
  if (props.beforeClose) {
    return props.beforeClose(() => hide())
  }
  emit('close')
  hide()
}
const onModalClick = () => {
  if (props.closeOnClickModal) doClose()
}
const onClose = () => {
  doClose()
}

const onPressEscape = (e: KeyboardEvent) => {
  if (e.keyCode === 27) doClose()
}

useDraggable(targetRef, handleRef, draggable)

onMounted(() => {
  if (props.closeOnPressEscape) {
    window.addEventListener('keydown', onPressEscape)
  }
})

onBeforeUnmount(() => {
  if (props.closeOnPressEscape) {
    window.removeEventListener('keydown', onPressEscape)
  }
})
</script>

<style lang="less">
@import './dialog.less';
</style>
