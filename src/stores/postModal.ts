import { create } from 'zustand'

type ModalState = {
  primary: boolean
  secondary: boolean
}

type Actions = {
  openModal: (key: keyof ModalState) => void
  closeModal: () => void
  setFeedbackMessage: (message: string) => void
  resetModal: VoidFunction
}

type PostModalStore = {
  modalState: ModalState
  feedbackMessage: string
  actions: Actions
}

const initialValues = {
  modalState: {
    primary: false,
    secondary: false,
  },
  feedbackMessage: '',
}

export const usePostModalStore = create<PostModalStore>((set) => ({
  ...initialValues,
  actions: {
    openModal: (key) => set((state) => ({ modalState: { ...state.modalState, [key]: true } })),
    closeModal: () => set({ modalState: { primary: false, secondary: false } }),
    setFeedbackMessage: (message) => set({ feedbackMessage: message }),
    resetModal: () => set({ ...initialValues }),
  },
}))

export const usePostModal = () => usePostModalStore((state) => state.modalState)
export const usePostModalText = () => usePostModalStore((state) => state.feedbackMessage)
export const usePostModalActions = () => usePostModalStore((state) => state.actions)
