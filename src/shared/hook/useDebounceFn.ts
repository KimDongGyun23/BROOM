import { useCallback, useRef } from 'react'

const useDebounceFn = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )

  return debouncedFn
}

export default useDebounceFn
