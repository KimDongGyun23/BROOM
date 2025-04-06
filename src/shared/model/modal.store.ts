import { create } from 'zustand'

type ModalStore = {
  modals: Record<string, { isOpen: boolean; label: string }>
  actions: {
    openModal: (id: string, label: string) => void
    closeModal: () => void
  }
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  actions: {
    openModal: (id, label) =>
      set((state) => ({
        modals: { ...state.modals, [id]: { isOpen: true, label } },
      })),
    closeModal: () => set({ modals: {} }),
  },
}))

export const useModalState = () => useModalStore((state) => state.modals)
export const useModalActions = () => useModalStore((state) => state.actions)
