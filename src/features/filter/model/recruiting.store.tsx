import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  toggleRecruiting: VoidFunction
}

type RecruitingStore = {
  isRecruiting: boolean
  actions: Actions
}

const RecruitingStoreContext = createContext<StoreApi<RecruitingStore> | null>(null)

export const RecruitingStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<RecruitingStore>((set) => ({
      isRecruiting: false,
      actions: {
        toggleRecruiting: () => set((state) => ({ isRecruiting: !state.isRecruiting })),
      },
    })),
  )

  return <RecruitingStoreContext.Provider value={store}>{children}</RecruitingStoreContext.Provider>
}

export const useRecruitingStore = <T,>(selector: (state: RecruitingStore) => T): T => {
  const store = useContext(RecruitingStoreContext)
  if (!store) {
    throw new Error('useRecruitingStore는 RecruitingStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useIsRecruiting = () => useRecruitingStore((state) => state.isRecruiting)
export const useRecruitingActions = () => useRecruitingStore((state) => state.actions)
