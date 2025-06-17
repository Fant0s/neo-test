<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskList from '@/components/TaskList.vue'
</script>

<template>
  <header>Задачи</header>
  <main>
    <section class="add-section">
      <TaskForm />
    </section>
    <section class="tasks-section">
      <div class="filters">
        <TaskFilter />
      </div>
      <TaskList />
    </section>
  </main>
</template>

<style lang="sass" scoped>

main
  display: flex
  flex-direction: column
  flex: 1
  max-width: 800px
  margin: 0 auto
  width: 100%
</style>
