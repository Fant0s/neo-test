// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { createStore, useStore as VuexStore } from 'vuex'
import task from '@/store/modules/task'

const store = createStore({
  modules: {
    task,
  },
})

export function useStore() {
  return VuexStore()
}

export default store
