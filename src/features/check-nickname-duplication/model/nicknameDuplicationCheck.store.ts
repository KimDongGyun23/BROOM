import { create } from 'zustand'

type Actions = {
  setNicknameDuplicationCheckState: (isUnique: boolean, resultMessage: string) => void
}

type NicknameDuplicationCheckStore = {
  isUnique: boolean
  resultMessage: string
  actions: Actions
}

const initialValue = {
  isUnique: false,
  resultMessage: '',
}

const useNicknameDuplicationCheckStore = create<NicknameDuplicationCheckStore>((set) => ({
  ...initialValue,
  actions: {
    setNicknameDuplicationCheckState: (isUnique, resultMessage) => set({ isUnique, resultMessage }),
  },
}))

export const useNicknameUniqueState = () =>
  useNicknameDuplicationCheckStore((state) => state.isUnique)
export const useNicknameDuplicationResultMessage = () =>
  useNicknameDuplicationCheckStore((state) => state.resultMessage)
export const useNicknameDuplicationCheckActions = () =>
  useNicknameDuplicationCheckStore((state) => state.actions)
