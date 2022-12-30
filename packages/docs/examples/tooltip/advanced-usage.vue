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
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.expand-fade-leave-active {
  margin-left: 20px;
  opacity: 0;
}
</style>
