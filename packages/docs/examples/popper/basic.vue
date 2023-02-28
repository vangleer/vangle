<template>
  <van-popper ref="poperRef">
    <button>hover me</button>
    <template #content>
      123465
    </template>
  </van-popper>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const poperRef = ref()

</script>