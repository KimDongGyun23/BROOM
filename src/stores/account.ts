import { create } from 'zustand'

type ModalState = {
  isSuccessModalOpen: boolean
  isErrorModalOpen: boolean
}

type Actions = {
  toggleEditMode: VoidFunction
  setModalState: (state: Partial<ModalState>) => void
  setNicknameValidated: (value: boolean) => void
  resetAccount: VoidFunction
}

type AccountStore = {
  isEditMode: boolean
  modalState: ModalState
  isNicknameValidated: boolean
  actions: Actions
}

const initialValues = {
  isEditMode: false,
  modalState: {
    isSuccessModalOpen: false,
    isErrorModalOpen: false,
  },
  isNicknameValidated: false,
}

export const useAccountStore = create<AccountStore>((set) => ({
  ...initialValues,
  actions: {
    toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    setModalState: (newState) =>
      set((state) => ({
        modalState: { ...state.modalState, ...newState },
      })),
    setNicknameValidated: (value) => set({ isNicknameValidated: value }),
    resetAccount: () => set({ ...initialValues }),
  },
}))

export const useAccountModeState = () => useAccountStore((state) => state.isEditMode)
export const useModalState = () => useAccountStore((state) => state.modalState)
export const useNicknameValidation = () => useAccountStore((state) => state.isNicknameValidated)
export const useAccountActions = () => useAccountStore((state) => state.actions)
