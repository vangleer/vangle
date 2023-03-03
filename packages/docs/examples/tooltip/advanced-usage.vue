<template>
  <van-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
    effect="light"
  >
    <van-button @click="disabled = !disabled"
      >click to {{ disabled ? 'active' : 'close' }} tooltip function</van-button
    >
  </van-tooltip>

  <van-tooltip
    :disabled="disabled"
    content="custom transition name"
    placement="bottom"
    effect="light"
    transition-name="custom-name"
  >
    <van-button>custom transition name</van-button
    >
  </van-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<style>
.van-popper-fade-enter-active {
  transition: all 0.3s ease;
}
.van-popper-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.van-popper-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}

.custom-name-enter-from,
.custom-name-leave-to {
  overflow: hidden;
  transform: scaleY(.5);
  opacity: 0;
}
</style>
