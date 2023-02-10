<template>
  <van-button :plain="true" @click="open1">message</van-button>
  <van-button :plain="true" @click="open2">success</van-button>
  <van-button :plain="true" @click="open3">warning</van-button>
  <van-button :plain="true" @click="open4">error</van-button>
</template>

<script lang="ts" setup>
import { VanMessage } from 'vangle'

const open1 = () => {
  VanMessage({
    showClose: true,
    message: 'This is a message.',
  })
}
const open2 = () => {
  VanMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open3 = () => {
  VanMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning',
  })
}
const open4 = () => {
  VanMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'error',
  })
}
</script>
