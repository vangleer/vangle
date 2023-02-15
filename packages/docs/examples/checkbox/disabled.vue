<template>
  <van-checkbox v-model="checked1" disabled>Disabled</van-checkbox>
  <van-checkbox v-model="checked2">Not disabled</van-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
