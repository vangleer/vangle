<template>
  <div>
    <van-radio-group v-model="radio1">
      <van-radio label="1" border>Option A</van-radio>
      <van-radio label="2" border>Option B</van-radio>
    </van-radio-group>
  </div>
  <div style="margin-top: 20px">
    <van-radio-group v-model="radio2">
      <van-radio label="1" border>Option A</van-radio>
      <van-radio label="2" border disabled>Option B</van-radio>
    </van-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
</script>
