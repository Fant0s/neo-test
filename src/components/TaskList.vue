<script setup lang="ts">
import TaskComponent from '@/components/TaskComponent.vue'
import { useStore } from '@/store'
import { computed, onMounted, watch, ref } from 'vue'
import { TaskFilter } from '@/types/task/task.ts'
const store = useStore()

const loadingList = computed(() => store.state.task.isLoadingList)
const activeFilter = computed(() => store.state.task.activeFilter)
const tasks = computed(() => store.state.task.list)
const completedTasks = computed(() => store.getters['task/completedTasks'])
const notCompletedTasks = computed(() => store.getters['task/notCompletedTasks'])

const showedTasks = ref<Task[]>([])

const updateShowedTasks = () => {
  if (activeFilter.value === TaskFilter.ALL) {
    showedTasks.value = tasks.value
  } else if (activeFilter.value === TaskFilter.COMPLETED) {
    showedTasks.value = completedTasks.value
  } else {
    showedTasks.value = notCompletedTasks.value
  }
}

watch(activeFilter, updateShowedTasks, { immediate: true })

onMounted(() => {
  store.dispatch('task/loadTasks')
})
</script>

<template>
  <div class="tasks">
    {{ showedTasks.length }}
    <template v-if="loadingList">
      <TaskComponent v-for="task in showedTasks" :key="task.id" :task="task" />
    </template>
    <div v-else class="loader"></div>
  </div>
</template>

<style scoped lang="sass"></style>
