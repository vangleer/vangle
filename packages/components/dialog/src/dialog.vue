<template>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { DialogProps } from './dialog'
defineOptions({
  name: 'VanDialog'
})

defineProps(DialogProps)

const { n, classes } = createNamespace('dialog')
</script>

<style lang="less">
@import './dialog.less';
</style>
