export const SESSION_KEYS = {
  LOGIN: 'login',
  NICKNAME: 'nickname',
  MILITARY_CHAPLAIN: 'chaplain',
  ROOM_TYPE: 'room_type',
  REFRESH: 'hserfer',
  POST_TAB: 'post-tab',
  BOOKMARK_TAB: 'bookmark-tab',
  CHATTING_TAB: 'chatting-tab',
} as const

export const getSessionStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(key)
}

export const setSessionStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value)
  }
}

export const removeSessionStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key)
  }
}

export const clearSessionStorage = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.clear()
  }
}
