import { type Filter, type Task, TaskFilter } from '@/types/task/task.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ActionContext } from 'vuex'

type Tasks = Task[]

export interface TaskState {
  activeFilter: Filter
  list: Tasks
  isLoadingList: boolean
  loadingTask: number | null
  error: string | null
}

type TaskActionContext = ActionContext<TaskState>

const state: TaskState = {
  activeFilter: TaskFilter.ALL,
  list: [],
  isLoadingList: false,
  loadingTask: null,
  error: null,
}

const fetchTasks = (): Promise<Tasks> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Изучить Vuex', completed: false },
        { id: 2, title: 'Создать хранилище', completed: true },
        { id: 3, title: 'Реализовать асинхронные действия', completed: false },
      ])
    }, 2000)
  })
}

const getters = {
  generateTaskID() {
    return state.list.length ? state.list.length + 1 : 4
  },
  completedTasks() {
    return state.list.filter((task: Task) => task.completed)
  },
  notCompletedTasks() {
    return state.list.filter((task: Task) => !task.completed)
  },
}

const actions = {
  async loadTasks({ commit }: TaskActionContext) {
    commit('setLoadingList', true)
    try {
      const tasks = await fetchTasks()
      commit('setTasks', tasks)
      commit('setError', null)
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Ошибка загрузки задач')
    } finally {
      commit('setLoadingList', false)
    }
  },

  async toggleTask({ commit }: TaskActionContext, taskId: number) {
    commit('setLoadingTask', true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      commit('toggleTask', taskId)
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      commit('setLoadingTask', false)
    }
  },

  async addTask({ commit }: TaskActionContext, task: Task) {
    commit('setLoadingList', true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))
      commit('addTask', task)
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Ошибка загрузки задачи')
    } finally {
      commit('setLoadingList', false)
    }
  },

  async deleteTask({ commit }: TaskActionContext, taskId: number) {
    commit('setLoadingList', true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      commit('deleteTask', taskId)
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Ошибка удаления задачи')
    } finally {
      commit('setLoadingList', false)
    }
  },

  setFilter({ commit }: TaskActionContext, filter: TaskFilter) {
    commit('setFilter', filter)
  },
}

const mutations = {
  setLoadingTask(state: TaskState, taskID: number) {
    state.loadingTask = taskID
  },
  setLoadingList(state: TaskState, load: boolean) {
    state.isLoadingList = load
  },
  addTask(state: TaskState, task: Task) {
    state.list.push(task)
  },
  setTasks(state: TaskState, tasks: Tasks) {
    state.list = tasks
  },
  setError(state: TaskState, error: string | null) {
    state.error = error
  },
  setFilter(state: TaskState, filter: TaskFilter) {
    state.activeFilter = filter
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
