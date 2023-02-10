<template>
  <van-button :plain="true" @click="openHTML">Use HTML String</van-button>
</template>

<script lang="ts" setup>
import { VanMessage } from 'vangle'

const openHTML = () => {
  VanMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  })
}
</script>
