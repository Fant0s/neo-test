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
  display: flex
  justify-content: center
  align-items: center
  padding: 5px 10px
  border-radius: 20px
  background-color: #7c7c7c
  border: 2px solid #7c7c7c
  color: white
  font-size: 14px
  &.active
    background-color: green
    border-color:  green
    color: black
</style>
