import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LoginResponse } from '@/entities/auth/model/auth.type'

type Actions = {
  login: (user: LoginResponse) => void
  logout: VoidFunction
  refresh: VoidFunction
}

type AuthStore = {
  isLoggedIn: boolean
  user: LoginResponse | null
  actions: Actions
}

const initialStates = {
  isLoggedIn: false,
  user: null,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialStates,
      actions: {
        login: (user) => set({ isLoggedIn: true, user }),
        logout: () => {
          localStorage.clear()
          set({ ...initialStates })
        },
        refresh: () => set((state) => ({ ...state.user, isLoggedIn: true })),
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
    },
  ),
)

export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn)
export const useUserData = () => useAuthStore((state) => state.user)
export const useAuthActions = () => useAuthStore((state) => state.actions)
