<script setup lang="ts">
import type { Task } from '@/types/task/task.ts'

interface TaskProps {
  task: Task
}

const props = defineProps<TaskProps>()
const emit = defineEmits<{
  (e: 'update', id: number): void
  (e: 'delete', id: number): void
}>()

const handleDelete = () => {
  emit('delete', props.task.id)
}
const handleEdit = () => {
  emit('update', props.task.id)
}
</script>

<template>
  <div class="task" :id="`task_${props.task.id}`">
    <input type="checkbox" v-model="props.task.completed" class="checkbox" />
    <h2 class="title">{{ props.task.title }}</h2>
    <button class="delete-btn" @click="handleDelete">Delete</button>
  </div>
</template>

<style scoped></style>
