<template>
  <div class="demo-input-suffix">
    <div class="demo-row">
      <span class="demo-row-label"
        >attributes</span
      >
      <van-input
        v-model="input1"
        class="w-50 m-2"
        placeholder="Pick a date"
        suffix-icon="calendar"
      />
      <van-input
        v-model="input2"
        class="w-50 m-2"
        placeholder="Type something"
        prefix-icon="search"
      />
    </div>
  </div>
  <div class="demo-input-suffix">
    <div class="demo-row">
      <span class="demo-row-label"
        >slots</span
      >
      <van-input v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
          <van-icon class="van-input__icon" name="calendar" />
        </template>
      </van-input>
      <van-input v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
          <van-icon class="van-input__icon" name="search" />
        </template>
      </van-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
</script>

<style scoped lang="scss">
.demo-row {
  display: flex;
  margin-bottom: 20px;
  .demo-row-label {
  width: 300px;
}
  .van-input {
    margin-right: 20px;
  }
}


</style>