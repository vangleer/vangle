<template>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { MessageBoxProps } from './message-box'
defineOptions({
  name: 'VanMessageBox'
})

defineProps(MessageBoxProps)

const { n, classes } = createNamespace('message-box')
</script>

<style lang="less">
@import './message-box.less';
</style>
