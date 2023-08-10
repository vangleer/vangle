<template>
  <ClientOnly>
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
          <VanTooltip content="复制代码" :show-arrow="false">
            <span class="op-btn" @click="handleCopy">
              <VanIcon name="document-copy" />
            </span>
          </VanTooltip>
          <VanTooltip content="查看源代码" :show-arrow="false">
            <span class="op-btn" @click="toggleSourceVisible()">
              <VanIcon name="arrow-left" />
              <VanIcon name="arrow-right" style="margin-left: -2px;" />
            </span>
          </VanTooltip>
          <!-- <span class="op-btn" @click="toggleSourceVisible()">查看源代码</span> -->
        </div>

        <div v-show="sourceVisible"></div>

        <VanCollapseTransition>
          <div v-show="sourceVisible" class="example-source-wrapper">
            <div class="example-source language-vue" v-html="decodedSource"></div>
          </div>
        </VanCollapseTransition>
        
        <Transition name="van-fade-in-linear">
          <div
            v-show="sourceVisible"
            class="example-float-control"
            @click="toggleSourceVisible()"
          >
            <VanIcon name="caret-top" />
            <span style="padding-left: 8px;">隐藏代码</span>
          </div>
        </Transition>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VanIcon, VanTooltip, VanMessage } from '@vangle/components'
import VanCollapseTransition from '@vangle/components/collapse-transition'
import { demos, sourceCode } from '../../../examples'
const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach(key => {
    demoObj[key.replace('./', '').replace('.vue', '')] =
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

function handleCopy() {
  var aux = document.createElement('textarea')
  aux.innerHTML = sourceCode[`./${props.path}.vue`]
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  
  VanMessage.success('复制成功')
}
</script>

<style lang="scss">
.example-showcase {
  padding: 0.8rem;
  margin: 0.5px;
  >.van-icon {
    margin-right: 16px;
    font-size: 26px;
  }
}
.example {
  border: 1px solid var(--border-color);
  border-radius: 3px;
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
    cursor: pointer;
    .op-btn {
      margin-left: 10px;
      &:hover {
        color: var(--van-color-primary);
      }
    }
  }
  .example-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--van-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: var(--bg-color, '#fff');
    &:hover {
      color: var(--van-color-primary);
    }
  }
  .example-source-wrapper {
    .example-source.language-vue {
      margin: 0 !important;
      border-radius: 0;
    }
  }
}

.van-divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0px 0;
  border-top: 1px solid var(--border-color);
}
.van-fade-in-linear-enter-active,
.van-fade-in-linear-leave-active {
  transition: all .3s;
}

.van-fade-in-linear-enter-from,
.van-fade-in-linear-leave-to {
  opacity: 0;
}
</style>
