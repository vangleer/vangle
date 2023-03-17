<template>
  <div>
    <van-date-picker v-model="date" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const date = ref('')
</script>