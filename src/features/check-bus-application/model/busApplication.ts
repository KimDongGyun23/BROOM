import { create } from 'zustand'

import type { BusApplicationStatus } from '@/entities/bus/config/bus.constant'
import { BUS_APPLICATION_STATUS } from '@/entities/bus/config/bus.constant'

type Actions = {
  setApplicationStatus: (status: BusApplicationStatus) => void
}

type BusApplicationStore = {
  status: BusApplicationStatus
  actions: Actions
}

const useBusApplicationStore = create<BusApplicationStore>((set) => ({
  status: BUS_APPLICATION_STATUS.PENDING,
  actions: {
    setApplicationStatus: (status) => set({ status }),
  },
}))

export const useBusApplicationStatus = () => useBusApplicationStore((state) => state.status)
export const useBusApplicationStatusActions = () => useBusApplicationStore((state) => state.actions)
