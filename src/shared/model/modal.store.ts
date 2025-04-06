import { create } from 'zustand'

type ModalStore = {
  modals: Record<string, { isOpen: boolean; label: string }>
  actions: {
    openModal: (id: string, label: string) => void
    closeModal: () => void
    isModalOpen: (id: string) => boolean
    getModalLabel: (id: string) => string | undefined
  }
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  actions: {
    openModal: (id, label) =>
      set((state) => ({
        modals: { ...state.modals, [id]: { isOpen: true, label } },
      })),
    closeModal: () => set({ modals: {} }),
    isModalOpen: (id) => !!get().modals[id]?.isOpen,
    getModalLabel: (id) => get().modals[id]?.label,
  },
}))

export const useModalState = () => useModalStore((state) => state.modals)
export const useModalActions = () => useModalStore((state) => state.actions)
