import { create } from 'zustand'

type Actions = {
  sortedDates: () => string[]
  addTrainingDate: (date: string) => void
  removeTrainingDate: (date: string) => void
}

type TrainingScheduleStore = {
  selectedDates: Set<string>
  actions: Actions
}

export const useTrainingScheduleStore = create<TrainingScheduleStore>((set, get) => ({
  selectedDates: new Set(),
  actions: {
    sortedDates: () =>
      [...get().selectedDates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
    addTrainingDate: (date) =>
      set((state) => {
        const updatedDates = new Set(state.selectedDates)
        updatedDates.add(date)
        return { selectedDates: updatedDates }
      }),
    removeTrainingDate: (date) =>
      set((state) => {
        const updatedDates = new Set(state.selectedDates)
        updatedDates.delete(date)
        return { selectedDates: updatedDates }
      }),
  },
}))

export const useTrainingScheduleList = () =>
  useTrainingScheduleStore((state) => state.selectedDates)
export const useTrainingScheduleActions = () => useTrainingScheduleStore((state) => state.actions)
