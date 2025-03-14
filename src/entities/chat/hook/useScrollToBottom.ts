import { useEffect, useRef, useState } from 'react'

export const useScrollToBottom = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null)

  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      console.log('scroll')
      console.log(
        chatListRef,
        chatListRef.current?.scrollTop,
        chatListRef.current?.scrollHeight,
        chatListRef.current?.clientHeight,
      )
      if (chatListRef.current) {
        const scrollPosition = chatListRef.current.scrollTop

        setShowScrollButton(scrollPosition - 10 < 0)
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
      setShowScrollButton(false)
    }
  }

  return { showScrollButton, handleScrollToBottom, chatListRef }
}
