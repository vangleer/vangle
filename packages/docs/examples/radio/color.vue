<template>
  <van-radio-group v-model="radio1" fill="#00afef">
    <van-radio label="1">Option 1</van-radio>
    <van-radio label="2">Option 2</van-radio>
  </van-radio-group>

  <van-radio-group style="margin-top: 20px;" v-model="radio2" fill="#00c48f">
    <van-radio label="1" border>Option 1</van-radio>
    <van-radio label="2" border>Option 2</van-radio>
  </van-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('1')
</script>
