<template>
  <div class="container">
    <!-- <Demo /> -->

    <VanPopper
      effect="dark"
      content="你好呀！"
    >
      noWrap
    </VanPopper>
    <VanPopper
      effect="dark"
      content="你也好呀！"
    >
      <span class="demo-btn">wrap</span>
    </VanPopper>
  </div>
</template>

<script lang="ts" setup>
import Demo from './components/popper/demo.vue'
import VanPopper from './components/popper/popper.vue'
</script>

<style lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.demo-btn {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  & + & {
    margin-left: 10px;
  }
}
</style>