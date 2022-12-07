<template>
  <van-button type="text" @click="outerVisible = true"
    >open the outer Dialog</van-button
  >

  <van-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <van-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <van-button @click="outerVisible = false">Cancel</van-button>
        <van-button type="primary" @click="innerVisible = true"
          >open the inner Dialog</van-button
        >
      </div>
    </template>
  </van-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
