<template>
  <van-button text @click="handleClick">
    click to open the Dialog
  </van-button>

  <van-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <van-button @click="dialogVisible = false">Cancel</van-button>
        <van-button type="primary" @click="dialogVisible = false">
          Confirm
        </van-button>
      </span>
    </template>
  </van-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const handleClick = () => {
  dialogVisible.value = true
}

const handleClose = (done: () => void) => {
  // dialogVisible.value = false
  done()
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>