import { create } from 'zustand'

import type { TrainingSchedule } from './admin.type'

type Actions = {
  sortedDates: () => TrainingSchedule[]
  addTrainingDate: (newDate: TrainingSchedule) => void
  removeTrainingDate: (id: number) => void
  initializeSchedules: (dates: TrainingSchedule[]) => void
}

type TrainingScheduleStore = {
  selectedDates: TrainingSchedule[]
  actions: Actions
}

export const useTrainingScheduleStore = create<TrainingScheduleStore>((set, get) => ({
  selectedDates: [],
  actions: {
    sortedDates: () =>
      [...get().selectedDates].sort(
        (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime(),
      ),
    addTrainingDate: (newDate) =>
      set((state) => ({
        selectedDates: [...state.selectedDates, newDate],
      })),
    removeTrainingDate: (id) =>
      set((state) => ({
        selectedDates: state.selectedDates.filter((date) => date.id !== id),
      })),
    initializeSchedules: (dates) => set({ selectedDates: dates }),
  },
}))

export const useTrainingScheduleList = () =>
  useTrainingScheduleStore((state) => state.selectedDates)
export const useTrainingScheduleActions = () => useTrainingScheduleStore((state) => state.actions)
