<script setup lang="ts">
const props = defineProps<{ active: boolean; text: string }>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="btn" :class="{ active: props.active }" @click="$emit('click')">
    {{ props.text }}
  </button>
</template>

<style lang="sass" scoped>
.btn
  background-color: white
  &.active
    background-color: green
</style>
