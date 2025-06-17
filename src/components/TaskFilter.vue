<script setup lang="ts">
import ButtonFilter from '@/components/UI/ButtonFilter.vue'
import { useStore } from '@/store'
import { computed } from 'vue'
import { TaskFilter } from '@/types/task/task.ts'

const store = useStore()
const activeFilter = computed(() => store.state.task.activeFilter)

const isActive = (filter: TaskFilter) => activeFilter.value === filter

const setFilter = (filter: TaskFilter) => {
  store.dispatch('task/setFilter', filter)
}
</script>

<template>
  <div class="filters">
    <ButtonFilter
      :active="isActive(TaskFilter.ALL)"
      :text="TaskFilter.ALL"
      @click="setFilter(TaskFilter.ALL)"
    />
    <ButtonFilter
      :active="isActive(TaskFilter.COMPLETED)"
      :text="TaskFilter.COMPLETED"
      @click="setFilter(TaskFilter.COMPLETED)"
    />
    <ButtonFilter
      :active="isActive(TaskFilter.NOT_COMPLETED)"
      :text="TaskFilter.NOT_COMPLETED"
      @click="setFilter(TaskFilter.NOT_COMPLETED)"
    />
  </div>
</template>

<style lang="sass" scoped>
.filters
  display: flex
  flex-direction: row
  gap: 10px
  align-items: center
</style>
