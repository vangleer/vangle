<template>
  <van-checkbox-group v-model="checkList">
    <van-checkbox label="Option A" />
    <van-checkbox label="Option B" />
    <van-checkbox label="Option C" />
    <van-checkbox label="disabled" disabled />
    <van-checkbox label="selected and disabled" disabled />
  </van-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkList = ref(['selected and disabled', 'Option A'])
</script>
