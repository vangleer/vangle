<template>
  <van-popper ref="poperRef">
    <van-button>hover me</van-button>
    <template #content>
      啦啦啦啦啦啦啦
    </template>
  </van-popper>

  <van-popper ref="poperRef" effect="light">
    <van-button>hover me</van-button>
    <template #content>
      啦啦啦啦啦啦啦
    </template>
  </van-popper>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const poperRef = ref()

</script>