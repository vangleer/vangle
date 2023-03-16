<template>
  <div :class="[n()]" @mouseup.stop>
    <div :class="[n('wrapper')]">
      <div :class="[n('body')]">
        <div :class="[n('header')]"></div>
        <div :class="[n('content')]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@vangle/utils'
import { DatePickerProps } from './date-picker'
defineOptions({
  name: 'VanPickerPanel'
})

defineProps({
  
})

const { n } = createNamespace('picker-panel')
</script>

<style lang="less">
@import './date-picker.less';
</style>
