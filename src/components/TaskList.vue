<script setup lang="ts">
import TaskComponent from '@/components/TaskComponent.vue'
import { useStore } from '@/store'
import { computed, onMounted, watch, ref } from 'vue'
import { TaskFilter } from '@/types/task/task.ts'

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

const updateShowedTasks = () => {
  if (activeFilter.value === TaskFilter.ALL) {
    showedTasks.value = tasks.value
  } else if (activeFilter.value === TaskFilter.COMPLETED) {
    showedTasks.value = completedTasks.value
  } else {
    showedTasks.value = notCompletedTasks.value
  }
}

watch([activeFilter, tasks], updateShowedTasks, { immediate: true })

watch(showedTasks, (newVal) => {
  emits('showAmount', newVal.length)
})

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
  <div class="tasks">
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
  gap: 20px
</style>
