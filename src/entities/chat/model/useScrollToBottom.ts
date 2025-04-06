import { useEffect, useRef, useState } from 'react'

import useDebounceFn from '@/shared/hook/useDebounceFn'

export const useScrollToBottom = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null)

  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleScroll = useDebounceFn(() => {
    if (chatListRef.current) {
      const scrollPosition = chatListRef.current.scrollTop

      setShowScrollButton(scrollPosition + 10 < 0)
    }
  }, 100)

  useEffect(() => {
    const element = chatListRef.current

    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [chatListRef, handleScroll])

  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
      setShowScrollButton(false)
    }
  }

  return { showScrollButton, handleScrollToBottom, chatListRef }
}
