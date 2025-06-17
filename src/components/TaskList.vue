<script setup lang="ts">
import TaskComponent from '@/components/TaskComponent.vue'
import { useStore } from '@/store'
import { computed, onMounted, watch } from 'vue'
const store = useStore()

const loadingList = computed(() => store.state.task.isLoadingList)
const activeFilter = computed(() => store.state.task.activeFilter)
const tasks = computed(() => store.state.task.list)

const showedTasks = ref<Task[]>([])

watch(
  () => store.state.task.activeFilter,
  () => {},
)

onMounted(() => {
  store.dispatch('task/loadTasks')
})
</script>

<template>
  <div class="tasks">
    <template v-if="loadingList">
      <TaskComponent v-for="task in tasks" :key="task.id" :task="task" />
    </template>
    <div v-else class="loader"></div>
  </div>
</template>

<style scoped lang="sass"></style>
