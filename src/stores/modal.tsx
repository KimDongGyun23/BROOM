import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  openModal: (label: string) => void
  closeModal: VoidFunction
}

type ModalStore = {
  modalState: {
    isModalOpen: boolean
    label: string
  }
  actions: Actions
}

const initialValues = {
  modalState: {
    isModalOpen: false,
    label: '',
  },
}

const ModalStoreContext = createContext<StoreApi<ModalStore> | null>(null)

export const ModalStoreProvider = ({ children }: PropsWithChildren) => {
  const store = createStore<ModalStore>((set) => ({
    ...initialValues,
    actions: {
      openModal: (label: string) => set(() => ({ modalState: { isModalOpen: true, label } })),
      closeModal: () => set(() => ({ ...initialValues })),
    },
  }))

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
export const useModalActions = () => useModalStore((state) => state.actions)
