import { useEffect, useRef, useState } from 'react'

export const useScrollToBottom = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null)

  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const scrollPosition = chatListRef.current.scrollTop
        const scrollHeight = chatListRef.current.scrollHeight
        const clientHeight = chatListRef.current.clientHeight

        setShowScrollButton(scrollPosition + clientHeight < scrollHeight)
      }
    }

    const element = chatListRef.current

    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [chatListRef])

  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }

  return { showScrollButton, handleScrollToBottom, chatListRef }
}
