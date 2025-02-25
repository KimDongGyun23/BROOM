import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  openModal: (label: string, isSuccessModal?: boolean) => void
  openTwoButtonModal: (twoButtonLabel: string) => void
  closeModal: VoidFunction
}

type ModalStore = {
  isSuccessModal: boolean
  modalState: {
    isModalOpen: boolean
    label: string
  }
  twoButtonModalState: {
    isTwoButtonModalOpen: boolean
    twoButtonLabel: string
  }
  actions: Actions
}

const initialValues = {
  isSuccessModal: true,
  modalState: {
    isModalOpen: false,
    label: '',
  },
  twoButtonModalState: {
    isTwoButtonModalOpen: false,
    twoButtonLabel: '',
  },
}

const ModalStoreContext = createContext<StoreApi<ModalStore> | null>(null)

export const ModalStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<ModalStore>((set) => ({
      ...initialValues,
      actions: {
        openModal: (label, isSuccessModal) =>
          set({ modalState: { isModalOpen: true, label }, isSuccessModal }),
        openTwoButtonModal: (twoButtonLabel) =>
          set({ twoButtonModalState: { isTwoButtonModalOpen: true, twoButtonLabel } }),
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

export const useModalState = () => useModalStore((state) => state.modalState)
export const useTwoButtonModalState = () => useModalStore((state) => state.twoButtonModalState)
export const useIsSuccessModal = () => useModalStore((state) => state.isSuccessModal)
export const useModalActions = () => useModalStore((state) => state.actions)
