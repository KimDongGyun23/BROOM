import { create } from 'zustand'

import type { LoginResponse } from '@/entities/auth/model/auth.type'

type Actions = {
  login: (user: LoginResponse) => void
  logout: () => void
}

type AuthStore = {
  isLoggedIn: boolean
  user: LoginResponse | null
  actions: Actions
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  actions: {
    login: (user) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null }),
  },
}))

export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn)
export const useUserData = () => useAuthStore((state) => state.user)
export const useAuthActions = () => useAuthStore((state) => state.actions)
