import { create } from 'zustand'

import type { Message } from '@/features/chat/model/chat.type'

type Actions = {
  setInitialMessage: (messages: Message[]) => void
  addMessage: (message: Message) => void
  sendMessage: (message: Message) => void
}

type ChatMessageStore = {
  messages: Message[]
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
