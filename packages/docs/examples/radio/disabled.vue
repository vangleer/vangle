<template>
  <van-radio v-model="radio" disabled label="disabled">Option A</van-radio>
  <van-radio v-model="radio" disabled label="selected and disabled"
    >Option B</van-radio
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('selected and disabled')
</script>
