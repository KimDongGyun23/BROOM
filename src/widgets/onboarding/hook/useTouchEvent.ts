import { useCallback, useRef } from 'react'

export const useTouchEvent = (
  currentTab: number,
  totalTabs: number,
  onDotClick: (index: number) => void,
) => {
  const touchStartPosition = useRef(0)
  const touchEndPosition = useRef(0)

  const handleSwipe = useCallback(
    (direction: number) => {
      if (direction > 50) {
        const newIndex = currentTab + 1 < totalTabs ? currentTab + 1 : currentTab
        onDotClick(newIndex)
      } else if (direction < -50) {
        const newIndex = currentTab - 1 >= 0 ? currentTab - 1 : currentTab
        onDotClick(newIndex)
      }
    },
    [currentTab, totalTabs, onDotClick],
  )

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartPosition.current = e.targetTouches[0].clientX
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchEndPosition.current = e.targetTouches[0].clientX
  }, [])

  const onTouchEnd = useCallback(() => {
    handleSwipe(touchStartPosition.current - touchEndPosition.current)
  }, [handleSwipe])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
