import { create } from 'zustand'

type RecruitingFilterStore = {
  isRecruiting: boolean
  actions: {
    toggleRecruiting: VoidFunction
  }
}

const createRecruitingFilterStore = () =>
  create<RecruitingFilterStore>((set) => ({
    isRecruiting: false,
    actions: {
      toggleRecruiting: () => set((state) => ({ isRecruiting: !state.isRecruiting })),
    },
  }))

const useRecruitingFilterStore = createRecruitingFilterStore()

export const usePostRecruitingState = () => useRecruitingFilterStore((state) => state.isRecruiting)
export const usePostRecruitingActions = () => useRecruitingFilterStore((state) => state.actions)

const useRecruitingSearchFilterStore = createRecruitingFilterStore()

export const useSearchRecruitingState = () =>
  useRecruitingSearchFilterStore((state) => state.isRecruiting)
export const useSearchRecruitingActions = () =>
  useRecruitingSearchFilterStore((state) => state.actions)
