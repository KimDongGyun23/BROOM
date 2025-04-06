import { useRef, useState } from 'react'

export const useCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentTab, setCurrentTab] = useState<number>(0)

  const onDotClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      })
      setCurrentTab(index)
    }
  }

  return {
    carouselRef,
    currentTab,
    onDotClick,
  }
}
