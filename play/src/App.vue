<template>
  <div class="container">
    <VanPopper>
      <span class="demo-btn">Picker</span>
      <template #content>
        <ESCalendar />
      </template>
    </VanPopper>
  </div>
</template>

<script lang="ts" setup>
import Demo from './components/popper/demo.vue'
import VanPopper from './components/popper/popper.vue'
import 'es-calendar/lib/style.css'
import ESCalendar from 'es-calendar'
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