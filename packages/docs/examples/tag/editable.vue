<template>
  <van-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </van-tag>
  <van-input
    v-if="inputVisible"
    style="width: 80px;height: 22px;"
    ref="InputRef"
    v-model="inputValue"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <van-button v-else size="small" @click="showInput">
    + New Tag
  </van-button>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { VanInput } from '@vangle/components'

const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof VanInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
