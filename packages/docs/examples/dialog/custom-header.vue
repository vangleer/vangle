<template>
  <van-button @click="visible = true">
    Open Dialog with customized header
  </van-button>
  <van-dialog v-model="visible" :show-close="false">
    <template #header="{ close }">
      <div class="my-header">
        <h4>This is a custom header!</h4>
        <van-button type="danger" @click="close">
          <van-icon class="van-icon--left" name="circle-close-filled"></van-icon>
          Close
        </van-button>
      </div>
    </template>
    This is dialog content.
  </van-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>