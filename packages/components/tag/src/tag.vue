<template>
  <Transition name="van-tag" :disable="disableTransitions">
    <span v-show="show" :class="claz">
      <slot></slot>
      <span v-if="closable" :class="n('close')" @click="handleClose">
        <VanIcon name="close" />
      </span>
    </span>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import VanIcon from '../../icon'
import { createNamespace } from '@vangle/utils'
import { TagProps } from './tag'
defineOptions({
  name: 'VanTag'
})

const props = defineProps(TagProps)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { n } = createNamespace('tag')

const show = ref(false)

const claz = computed(() => [
  n(),
  n(`--${props.type || 'primary'}`),
  `is-${props.effect}`,
  { closable: props.closable, [`is-round`]: props.round }
])
function handleClose() {
  emit('close')
}

onMounted(() => {
  show.value = true
})

</script>

<style lang="less">
@import './tag.less';
</style>
