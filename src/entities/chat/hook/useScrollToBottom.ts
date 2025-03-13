import { useEffect, useRef, useState } from 'react'

import { useChatMessages } from '../model/chatMessage.store'

export const useScrollToBottom = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null)

  const [showScrollButton, setShowScrollButton] = useState(false)

  const messageList = useChatMessages()

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const scrollPosition = chatListRef.current.scrollTop
        const scrollHeight = chatListRef.current.scrollHeight
        const clientHeight = chatListRef.current.clientHeight

        console.log(
          scrollPosition,
          scrollHeight,
          clientHeight,
          scrollPosition + clientHeight < scrollHeight,
        )
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
  }, [chatListRef, messageList])

  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }

  return { showScrollButton, handleScrollToBottom, chatListRef }
}
