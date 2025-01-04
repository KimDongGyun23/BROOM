import { useEffect, useRef } from 'react'

import type { MessageType } from '@/types'

export const useScrollToBottom = (messages: MessageType[]) => {
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
