<template>
  <div class="row">
    <van-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
      round
    >
      {{ item.label }}
    </van-tag>
  </div>
  <div class="row">
    <van-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="light"
      round
    >
      {{ item.label }}
    </van-tag>
  </div>
  <div class="row">
    <van-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="plain"
      round
    >
      {{ item.label }}
    </van-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TagType } from '@vangle/components'

type Item = { type: TagType; label: string }

const items = ref<Array<Item>>([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])
</script>
<style>
.row {
  margin-bottom: 10px;
}
</style>