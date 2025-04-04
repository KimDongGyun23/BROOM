import { create } from 'zustand'

import type { TrainingDate } from './admin.type'

type TrainingScheduleStore = {
  trainingDates: TrainingDate[]
  actions: {
    getSortedDates: () => TrainingDate[]
    addTrainingDate: (newDate: TrainingDate) => void
    removeTrainingDate: (id: number) => void
    initializeTrainingDates: (dates: TrainingDate[]) => void
  }
}

export const useTrainingScheduleStore = create<TrainingScheduleStore>((set, get) => ({
  trainingDates: [],
  actions: {
    getSortedDates: () =>
      [...get().trainingDates].sort(
        (a, b) => new Date(a.trainingDate).getTime() - new Date(b.trainingDate).getTime(),
      ),
    addTrainingDate: (newDate) =>
      set((state) => ({
        trainingDates: [...state.trainingDates, newDate],
      })),
    removeTrainingDate: (id) =>
      set((state) => ({
        trainingDates: state.trainingDates.filter((date) => date.id !== id),
      })),
    initializeTrainingDates: (dates) => set({ trainingDates: dates }),
  },
}))

export const useTrainingScheduleList = () =>
  useTrainingScheduleStore((state) => state.trainingDates)

export const useTrainingScheduleActions = () => useTrainingScheduleStore((state) => state.actions)
