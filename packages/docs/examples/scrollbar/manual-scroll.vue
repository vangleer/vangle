<template>
  <van-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </van-scrollbar>

  <van-slider
    v-model="value"
    :max="max"
    @input="inputSlider"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<any>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value)
}
const scroll = ({ scrollTop }: any) => {
  value.value = scrollTop
}
const formatTooltip = (value: number) => {
  return `${value} px`
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--van-color-warning-8);
  color: var(--van-color-warning);
}
.van-slider {
  margin-top: 20px;
}
</style>
