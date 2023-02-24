<template>
  <van-radio-group v-model="radio1" class="ml-4">
    <van-radio label="1">Option 1</van-radio>
    <van-radio label="2">Option 2</van-radio>
  </van-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('1')
</script>
