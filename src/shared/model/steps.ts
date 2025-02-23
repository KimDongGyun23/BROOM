import { create } from 'zustand'

type Actions = {
  setCurrentStep: (newStep: number) => void
  goNextStep: () => void
  goPreviousStep: () => void
  resetStep: (totalStep: number) => void
}

type StepsStore = {
  currentStep: number
  totalStep: number
  actions: Actions
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  currentStep: 1,
  totalStep: 1,
  actions: {
    setCurrentStep: (newStep) =>
      set(() => {
        const { totalStep } = get()
        const boundedStep = Math.max(1, Math.min(newStep, totalStep))
        return { currentStep: boundedStep }
      }),
    goNextStep: () => {
      set(() => {
        const { currentStep, totalStep } = get()
        const nextStep = currentStep + 1
        const boundedStep = Math.max(1, Math.min(nextStep, totalStep))
        return { currentStep: boundedStep }
      })
    },
    goPreviousStep: () => {
      set(() => {
        const { currentStep } = get()
        const previousStep = currentStep - 1
        const boundedStep = Math.max(1, previousStep)
        return { currentStep: boundedStep }
      })
    },
    resetStep: (totalStep: number) => set(() => ({ currentStep: 1, totalStep })),
  },
}))

export const useCurrentStep = () => useStepsStore((state) => state.currentStep)
export const useTotalStep = () => useStepsStore((state) => state.totalStep)
export const useStepsActions = () => useStepsStore((state) => state.actions)
