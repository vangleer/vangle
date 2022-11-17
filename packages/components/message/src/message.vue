<template>
  <Transition name="message-fade">
    <div v-show="visible" :class="[n()]">
      <VanIcon name="warning" />
      <p :class="n('content')">{{ message }}</p>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createNamespace } from '@vangle/utils'
import { VanIcon } from '@vangle/components'
import { MessageProps } from './message'
defineOptions({
  name: 'VanMessage'
})

const props = defineProps(MessageProps)

const { n } = createNamespace('message')
const visible = ref(false)
const timerId = ref()

const startTimer = () => {
  timerId.value = setTimeout(() => {
    visible.value = false
  }, +props.duration)
}

const clearTimer = () => {
  if (timerId.value) {
    clearTimeout(timerId.value)
    timerId.value = undefined
  }
}

onMounted(() => {
  startTimer()
  visible.value = true
})

defineExpose({
  visible
})
</script>

<style lang="less">
@import './message.less';
</style>
