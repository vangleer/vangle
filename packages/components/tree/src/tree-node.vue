<template>
  <div :class="[n('node')]">
    <div :class="[n('node__content')]">
      <VanIcon name="caret-right" :class="n('node__expand-icon')" />
      <span :class="n('node__label')">{{ node.label }}</span>
    </div>
    <div :class="[n('node_children')]">
      <template v-if="node.children && node.children.length">
        <!-- <VanTreeNode v-for="item in node.children" :node="item" /> -->
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { createNamespace } from '@vangle/utils'
import { TreeProps } from './tree'
import VanIcon from '../../icon'
defineOptions({
  name: 'VanTree'
})

const props = defineProps({
  node: {
    type: Object,
    default: () => ({})
  }
})

const { n } = createNamespace('tree')

onMounted(() => {
})
</script>

<style lang="less">
@import './tree.less';
</style>
