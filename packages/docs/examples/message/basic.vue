<template>
  <van-button :plain="true" @click="open">Show message</van-button>
  <van-button :plain="true" @click="openVn">VNode</van-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { VanMessage } from 'vangle'
const open = () => {
  VanMessage('this is a message.')
}

const openVn = () => {
  VanMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>
