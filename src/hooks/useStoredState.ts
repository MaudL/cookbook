import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function useStoredState<T>(
  key: string | undefined,
  defaultValue: T,
  options?: { storage?: Storage },
): [T, Dispatch<SetStateAction<T>>] {
  const storageRef = useRef(options?.storage || window.sessionStorage)
  const state = useState<T>(() => {
    if (!key) return defaultValue

    try {
      const item = storageRef.current.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  })

  const [debouncedState] = useDebounce(state[0], 300)
  useEffect(() => {
    if (key) {
      try {
        storageRef.current.setItem(key, JSON.stringify(debouncedState))
      } catch (error) {
        console.error(error)
      }
    }
  }, [debouncedState, key])

  return state
}
