export interface Task {
  id: number
  title: string
  completed: boolean
}

export enum TaskFilter {
  ALL = 'Все',
  COMPLETED = 'Завершенные',
  NOT_COMPLETED = 'Незавершенные',
}

export type Filter = TaskFilter.ALL | TaskFilter.COMPLETED | TaskFilter.NOT_COMPLETED
