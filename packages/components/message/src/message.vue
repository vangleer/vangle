<template>
  <Transition name="message-fade" @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" :class="[n(), type && n('--' + type)]" :style="styles">
      <VanIcon :name="(icon || iconMap[type])" />
      <div v-if="!dangerouslyUseHTMLString" :class="n('content')">
        <slot>{{ message }}</slot>
      </div>
      <div v-else :class="n('content')" v-html="message"></div>
      <div v-if="showClose" :class="n('closeBtn')" @click="close">
        <VanIcon name="close" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import { createNamespace } from '@vangle/utils'
import { VanIcon } from '@vangle/components'
import { MessageProps } from './message'
defineOptions({
  name: 'VanMessage'
})
const iconMap: any = {
  info: 'info-filled',
  success: 'circle-check-filled',
  warning: 'warning-filled',
  error: 'circle-close-filled'
}
const props = defineProps(MessageProps)
const emit = defineEmits(['destroy', 'close'])

const { n } = createNamespace('message')
const visible = ref(false)
const timerId = ref()

const styles = computed(() => ({
  top: props.offset + 'px',
  zIndex: props.zIndex
}))

const startTimer = () => {
  timerId.value = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

const clearTimer = () => {
  if (timerId.value) {
    clearTimeout(timerId.value)
    timerId.value = undefined
  }
}

const close = () => visible.value = false

const beforeLeave = () => {
  emit('close')
}

onMounted(() => {
  startTimer()
  visible.value = true
})

onBeforeMount(() => {
  clearTimer()
})

defineExpose({
  visible,
  close
})
</script>

<style lang="less">
@import './message.less';
</style>
