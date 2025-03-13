import { useRef, useState } from 'react'

export const useScrollToBottom = () => {
  const chatListRef = useRef<HTMLDivElement | null>(null)

  const [showScrollButton, setShowScrollButton] = useState(false)

  console.log(
    chatListRef.current?.scrollTop,
    chatListRef.current?.scrollHeight,
    chatListRef.current?.clientHeight,
  )

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (chatListRef.current) {
  //       const scrollPosition = chatListRef.current.scrollTop
  //       const scrollHeight = chatListRef.current.scrollHeight
  //       const clientHeight = chatListRef.current.clientHeight

  //       console.log(
  //         scrollPosition,
  //         scrollHeight,
  //         clientHeight,
  //         scrollPosition + clientHeight < scrollHeight,
  //       )
  //       setShowScrollButton(scrollPosition + clientHeight < scrollHeight)
  //     }
  //   }

  //   const element = chatListRef.current

  //   if (element) {
  //     element.addEventListener('scroll', handleScroll)
  //   }

  //   return () => {
  //     if (element) {
  //       element.removeEventListener('scroll', handleScroll)
  //     }
  //   }
  // }, [chatListRef])

  // useEffect(() => {
  //   if (chatListRef.current) {
  //     const scrollPosition = chatListRef.current.scrollTop
  //     const scrollHeight = chatListRef.current.scrollHeight
  //     const clientHeight = chatListRef.current.clientHeight

  //     setShowScrollButton(scrollPosition + clientHeight < scrollHeight)
  //   }
  // }, [messageList])

  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }

  const handleScroll = () => {
    if (chatListRef.current) {
      const scrollPosition = chatListRef.current.scrollTop
      const scrollHeight = chatListRef.current.scrollHeight
      const clientHeight = chatListRef.current.clientHeight

      setShowScrollButton(scrollPosition + clientHeight < scrollHeight)
    }
  }

  return { showScrollButton, handleScroll, handleScrollToBottom, chatListRef }
}
