<template>
  <div style="margin-bottom: 10px;">
    <span style="margin-right: 10px;">Dark</span>
    <van-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
    >
      {{ item.label }}
    </van-tag>
  </div>
  <div style="margin-bottom: 10px;">
    <span style="margin-right: 10px;">Light</span>
    <van-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="light"
    >
      {{ item.label }}
    </van-tag>
  </div>
  <div style="margin-bottom: 10px;">
    <span style="margin-right: 10px;">Plain</span>
    <van-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="plain"
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
