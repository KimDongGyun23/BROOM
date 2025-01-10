import { create } from 'zustand'

import type { MessageType } from '@/types/chatting'

type Actions = {
  initialMessage: (messages: MessageType[]) => void
  addMessage: (message: MessageType) => void
  sendMessage: (message: MessageType) => void
}

type MessageStore = {
  messages: MessageType[]
  actions: Actions
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  actions: {
    initialMessage: (messages) => set(() => ({ messages: [...messages] })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    sendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  },
}))

export const useMessageData = () => useMessageStore((state) => state.messages)
export const useMessageActions = () => useMessageStore((state) => state.actions)
