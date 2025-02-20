import { create } from 'zustand'

import type { MessageType } from '@/types/chatting'

type Actions = {
  setInitialMessage: (messages: MessageType[]) => void
  addMessage: (message: MessageType) => void
  sendMessage: (message: MessageType) => void
}

type ChatMessageStore = {
  messages: MessageType[]
  actions: Actions
}

const useChatMessageStore = create<ChatMessageStore>((set) => ({
  messages: [],
  actions: {
    setInitialMessage: (messages) => set(() => ({ messages: [...messages] })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    sendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  },
}))

export const useChatMessages = () => useChatMessageStore((state) => state.messages)
export const useChatMessageActions = () => useChatMessageStore((state) => state.actions)
