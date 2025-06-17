<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskList from '@/components/TaskList.vue'
import { ref } from 'vue'

const showedAmount = ref(0)

const setAmount = (amount: number) => {
  showedAmount.value = amount
}
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
        <p v-show="showedAmount" class="text">Всего: {{ showedAmount }}</p>
      </div>
      <TaskList @show-amount="(amount) => setAmount(amount)" />
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
  .tasks-section
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
</style>
