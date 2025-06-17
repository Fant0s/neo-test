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
  confirm('Вы точно хотите удалить задачу?')
  emit('delete', props.task.id)
}
</script>

<template>
  <div class="task" :id="`task_${props.task.id}`" :class="{ completed: props.task.completed }">
    <div class="top">
      <div class="box">
        <input
          type="checkbox"
          :value="props.task.completed"
          @change="$emit('update', props.task.id)"
          class="checkbox"
          name="completed"
          :checked="props.task.completed"
        />
      </div>

      <h2 class="title">{{ props.task.title }}</h2>
    </div>
    <div class="bottom">
      <button class="delete-btn" @click="handleDelete">Удалить</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.task
  display: flex
  flex-direction: column
  justify-content: space-between
  background-color: #222222
  padding: 20px
  border-radius: 20px
  z-index: 1
  width: 100%
  transition: .3s ease-out
  .top
    display: flex
    flex-direction: row
    align-items: flex-start
    gap: 20px
    justify-content: flex-start
    margin-bottom: 20px
    .box
      display: flex
      justify-content: center
      align-items: center
      border-radius: 50%
      overflow: hidden
      background-color: #222222
      width: 30px
      height: 30px
      min-width: 30px
      box-shadow: inset 0 0 0 4px green
      .checkbox
        width: 100%
        height: 100%
        display: flex
        accent-color: green
    .title
      font-size: 24px
      line-height: 24px
  .bottom
    display: flex
    justify-content: end
    .delete-btn
      display: flex
      justify-content: center
      align-items: center
      border-radius: 10px
      padding: 3px 10px
      background-color: black
      color: white
      transition: .3s ease-out
      &:hover
        background-color: #7e0000
  &.completed
    background-color: #003900
    opacity: .5
    .bottom
      .delete-btn
        background-color: #001b00
        &:hover
          background-color: #7e0000
</style>
