import { create } from 'zustand'

import type { ChatSidebarInformationResponse } from './chat.type'

type Actions = {
  openSidebar: VoidFunction
  closeSidebar: VoidFunction
  setSidebarInformation: (information: ChatSidebarInformationResponse) => void
}

type SidebarStore = {
  isSidebarOpen: boolean
  sidebarInformation: ChatSidebarInformationResponse | null
  actions: Actions
}

const initialValues = {
  isSidebarOpen: false,
  sidebarInformation: null,
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  ...initialValues,
  actions: {
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    setSidebarInformation: (information) => set({ sidebarInformation: information }),
  },
}))

export const useIsSidebarOpen = () => useSidebarStore((state) => state.isSidebarOpen)
export const useSidebarInformation = () => useSidebarStore((state) => state.sidebarInformation)
export const useSidebarActions = () => useSidebarStore((state) => state.actions)
