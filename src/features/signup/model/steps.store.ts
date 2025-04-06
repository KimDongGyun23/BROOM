import { create } from 'zustand'

export const signupMap = {
  1: '계정 정보 기입',
  2: '회원 정보 기입',
  3: '약관 동의',
} as const

type StepsStore = {
  currentStep: number
  totalStep: number
  actions: {
    setCurrentStep: (newStep: number) => void
    goNextStep: VoidFunction
    goPreviousStep: VoidFunction
    setTotalStep: (totalStep: number) => void
  }
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  currentStep: 1,
  totalStep: Object.keys(signupMap).length,
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
    setTotalStep: (totalStep: number) => set(() => ({ currentStep: 1, totalStep })),
  },
}))

export const useCurrentStep = () => useStepsStore((state) => state.currentStep)
export const useTotalStep = () => useStepsStore((state) => state.totalStep)
export const useStepsActions = () => useStepsStore((state) => state.actions)
