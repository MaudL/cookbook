import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const isBrowser = typeof window !== 'undefined'

export default function useStoredState<T>(
  key: string | undefined,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const state = useState<T>(() => {
    if (!key || !isBrowser) return defaultValue

    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  })

  const [debouncedState] = useDebounce(state[0], 300)
  useEffect(() => {
    if (!key || !isBrowser) {
      return
    }

    try {
      window.sessionStorage.setItem(key, JSON.stringify(debouncedState))
    } catch (error) {
      console.error(error)
    }
  }, [debouncedState, key])

  return state
}
