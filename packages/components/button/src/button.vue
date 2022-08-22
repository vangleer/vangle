<template>
  <button><slot></slot></button>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'VangleButton'
})
</script>

<style>
button {
  color: var(--color-primary);
}
</style>
