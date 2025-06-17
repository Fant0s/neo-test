<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'

interface TaskForm {
  id?: number
  title: string
  completed: boolean
}

const formData = ref<TaskForm>({
  title: '',
  completed: false,
})

const store = useStore()

const addTask = () => {
  if (formData.value.title.trim()) {
    const newTask = {
      ...formData.value,
      id: store.getters['task/generateTaskID'],
    }
    store.dispatch('task/addTask', newTask)
    formData.value = {
      ...formData.value,
      title: '',
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTask" class="task-form">
    <label for="task_title" class="title" aria-label="Название">
      <input
        class="input"
        type="text"
        name="task_title"
        id="task_title"
        v-model.trim="formData.title"
        placeholder="Введите название задачи"
        required
      />
    </label>
    <button class="add-btn" type="submit">+</button>
  </form>
</template>

<style lang="sass" scoped>
.task-form
  display: flex
  flex-direction: row
  gap: 10px
  .title
    display: flex
    flex-direction: column
    width: 100%
    .input
      width: 100%
      height: 60px
      border-radius: 800px
      border: 2px solid green
      background-color: #222222
      color: white
      font-size: 20px
      padding: 10px 20px
      &::placeholder
        color: #686868
  .add-btn
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%
    width: 60px
    min-width: 60px
    height: 60px
    font-size: 60px
    background-color: #222222
    border: 2px solid green
    color: green
    &:active
      border-color: white
</style>
