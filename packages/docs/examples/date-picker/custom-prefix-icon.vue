<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">set prefix-icon</span>
      <van-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
        prefix-icon="search"
      />
    </div>

    <div class="block">
      <span class="demonstration">set prefix-icon with slot</span>
      <van-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
      >
        <template #prefix-icon>
          <p style="margin: 0;">pre</p>
        </template>
      </van-date-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')

</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--van-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--van-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
