import { useEffect, useRef } from 'react'

import type { Message } from '@/entities/chat/model/chat.type'

export const useScrollToBottom = (messages: Message[]) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (ref && ref.current) {
      const { scrollHeight, clientHeight } = ref.current
      ref.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return ref
}
