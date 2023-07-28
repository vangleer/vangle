<template>
  <div>
    <van-sortable v-model="list">
      <div v-for="element in list" :key="element.name" class="">{{element.name}}</div>
    </van-sortable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const list = ref([
  {
    "name": "for",
    "order": 4
  },
  {
    "name": "vue.js 2.0",
    "order": 5
  },
  {
    "name": "based",
    "order": 6
  },
  {
    "name": "vue.draggable",
    "order": 1
  },
  {
    "name": "component",
    "order": 3
  },
  {
    "name": "on",
    "order": 7
  },
  {
    "name": "Sortablejs",
    "order": 8
  },
  {
    "name": "draggable",
    "order": 2
  }
])
</script>