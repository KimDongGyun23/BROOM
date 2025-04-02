import { useCallback, useRef } from 'react'

export const useMouseEvent = (
  currentTab: number,
  totalTabs: number,
  onDotClick: (index: number) => void,
) => {
  const startX = useRef(0)
  const endX = useRef(0)
  const mouseDown = useRef(false)

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

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mouseDown.current = true
    startX.current = e.clientX
    endX.current = e.clientX
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown.current) return
    endX.current = e.clientX
  }, [])

  const onMouseUp = useCallback(() => {
    mouseDown.current = false
    const deltaX = startX.current - endX.current
    if (Math.abs(deltaX) > 30) {
      handleSwipe(deltaX)
    }
  }, [handleSwipe])

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }
}
