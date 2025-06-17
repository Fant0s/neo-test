<script setup lang="ts">
import TaskComponent from '@/components/TaskComponent.vue'
import { useStore } from '@/store'
import { computed, onMounted, watch, ref, nextTick } from 'vue'
import { type Task, TaskFilter } from '@/types/task/task.ts'

const emits = defineEmits<{
  (e: 'showAmount', amount: number): void
}>()

const store = useStore()

const loadingList = computed(() => store.state.task.isLoadingList)
const activeFilter = computed(() => store.state.task.activeFilter)
const tasks = computed(() => store.state.task.list)
const completedTasks = computed(() => store.getters['task/completedTasks'])
const notCompletedTasks = computed(() => store.getters['task/notCompletedTasks'])

const showedTasks = ref<Task[]>([])

const updateShowedTasksAndEmit = () => {
  let newTasks: Task[] = []

  if (activeFilter.value === TaskFilter.ALL) {
    newTasks = [...tasks.value]
  } else if (activeFilter.value === TaskFilter.COMPLETED) {
    newTasks = [...completedTasks.value]
  } else {
    newTasks = [...notCompletedTasks.value]
  }

  showedTasks.value = newTasks

  nextTick(() => {
    emits('showAmount', newTasks.length)
  })
}

watch([activeFilter, tasks], updateShowedTasksAndEmit, { immediate: true, deep: true })

onMounted(() => {
  store.dispatch('task/loadTasks')
})

const handleDelete = (id: number) => {
  store.dispatch('task/deleteTask', id)
}
const handleUpdate = (id: number) => {
  store.dispatch('task/toggleTask', id)
}
</script>

<template>
  <div class="tasks" :class="{ off: loadingList }">
    <template v-if="!loadingList">
      <div v-if="showedTasks.length === 0">Задач не найдено</div>
      <TaskComponent
        v-for="task in showedTasks"
        :key="task.id"
        :task="task"
        @delete="(id) => handleDelete(id)"
        @update="(id) => handleUpdate(id)"
      />
    </template>
    <div v-else class="loader">Загрузка..</div>
  </div>
</template>

<style scoped lang="sass">
.tasks
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  flex: 1
  gap: 20px
  overflow: auto
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))
  &.off
    filter: unset
  .loader
    display: flex
    font-size: 20px
    font-weight: 500
    color: #7c7c7c
</style>
