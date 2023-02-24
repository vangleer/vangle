<template>
  <van-radio-group v-model="radio">
    <van-radio :label="3">Option A</van-radio>
    <van-radio :label="6">Option B</van-radio>
    <van-radio :label="9">Option C</van-radio>
  </van-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref(3)
</script>
