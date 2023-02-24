<template>
  <van-tooltip :content="'Switch value: ' + value" placement="top">
    <van-switch
      v-model="value"
      style="--van-switch-on-color: #13ce66; --van-switch-off-color: #ff4949"
      active-value="100"
      inactive-value="0"
    />
  </van-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('100')
</script>
