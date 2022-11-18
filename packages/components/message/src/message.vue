<template>
  <Transition name="message-fade" @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" :class="[n(), type && n('--' + type)]" :style="styles">
      <VanIcon name="warning" />
      <p :class="n('content')">{{ message }}</p>
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
    console.log('定时器')
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
