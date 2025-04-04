import { create } from 'zustand'

type Actions = {
  setNicknameDuplicationCheckState: (isUnique: boolean, resultMessage: string) => void
  clearNicknameDuplicationCheckState: VoidFunction
}

type NicknameDuplicationCheckStore = {
  isUnique: boolean | null
  resultMessage: string
  actions: Actions
}

const initialValue = {
  isUnique: null,
  resultMessage: '',
}

const useNicknameDuplicationCheckStore = create<NicknameDuplicationCheckStore>((set) => ({
  ...initialValue,
  actions: {
    setNicknameDuplicationCheckState: (isUnique, resultMessage) => set({ isUnique, resultMessage }),
    clearNicknameDuplicationCheckState: () => set({ ...initialValue }),
  },
}))

export const useNicknameUniqueState = () =>
  useNicknameDuplicationCheckStore((state) => state.isUnique)
export const useNicknameDuplicationResultMessage = () =>
  useNicknameDuplicationCheckStore((state) => state.resultMessage)
export const useNicknameDuplicationCheckActions = () =>
  useNicknameDuplicationCheckStore((state) => state.actions)
