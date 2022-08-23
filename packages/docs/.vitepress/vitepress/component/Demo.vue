<template>
  <div>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <!-- <Example :file="path" :demo="formatPathDemos[path]" /> -->
      <div class="example-showcase">
        <component :is="formatPathDemos[path]" v-if="formatPathDemos[path]" />
      </div>

      <div class="van-divider"></div>

      <div class="op-btns">
        <span class="op-btn" @click="toggleSourceVisible()">查看源代码</span>
      </div>

      <div v-show="sourceVisible"></div>

      <div v-show="sourceVisible" class="example-source-wrapper">
        <div class="example-source language-vue" v-html="decodedSource"></div>
      </div>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          @click="toggleSourceVisible(false)"
        >
          <span>隐藏代码</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const demos = import.meta.globEager('../../../examples/**/*.vue')

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const n = 'button/basic'

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach(key => {
    demoObj[key.replace('../../../examples/', '').replace('.vue', '')] =
      demos[key].default
  })

  return demoObj
})

const sourceVisible = ref(false)

const decodedSource = computed(() => {
  return decodeURIComponent(props.source)
})
const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

function toggleSourceVisible() {
  sourceVisible.value = !sourceVisible.value
}
</script>

<style>
:root {
  --border-color: #dcdfe6;
}
.example {
  border: 1px solid var(--border-color);
  border-radius: 3px;
}

.van-divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  border-top: 1px solid var(--border-color);
}
</style>
