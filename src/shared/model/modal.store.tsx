import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  openOneButtonModal: (label: string, isSuccessModal?: boolean) => void
  openTwoButtonModal: (label: string) => void
  closeModal: VoidFunction
}

type ModalStore = {
  isSuccessModal: boolean
  oneButtonModalState: {
    isModalOpen: boolean
    label: string
  }
  twoButtonModalState: {
    isModalOpen: boolean
    label: string
  }
  actions: Actions
}

const initialValues = {
  isSuccessModal: true,
  oneButtonModalState: {
    isModalOpen: false,
    label: '',
  },
  twoButtonModalState: {
    isModalOpen: false,
    label: '',
  },
}

const ModalStoreContext = createContext<StoreApi<ModalStore> | null>(null)

export const ModalStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<ModalStore>((set) => ({
      ...initialValues,
      actions: {
        openOneButtonModal: (label, isSuccessModal) =>
          set({ oneButtonModalState: { isModalOpen: true, label }, isSuccessModal }),
        openTwoButtonModal: (label) => set({ twoButtonModalState: { isModalOpen: true, label } }),
        closeModal: () => set({ ...initialValues }),
      },
    })),
  )

  return <ModalStoreContext.Provider value={store}>{children}</ModalStoreContext.Provider>
}

export const useModalStore = <T,>(selector: (state: ModalStore) => T): T => {
  const store = useContext(ModalStoreContext)
  if (!store) {
    throw new Error('useModalStore는 ModalStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useOneButtonModalState = () => useModalStore((state) => state.oneButtonModalState)
export const useTwoButtonModalState = () => useModalStore((state) => state.twoButtonModalState)
export const useIsSuccessModal = () => useModalStore((state) => state.isSuccessModal)
export const useModalActions = () => useModalStore((state) => state.actions)
