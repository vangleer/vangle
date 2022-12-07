<template>
  <van-button type="text" @click="dialogVisible = true"
    >Click to open Dialog
  </van-button>

  <van-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <van-button @click="dialogVisible = false">Cancel</van-button>
        <van-button type="primary" @click="dialogVisible = false"
          >Confirm</van-button
        >
      </span>
    </template> 
  </van-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
