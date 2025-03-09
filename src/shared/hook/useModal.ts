import { useState } from 'react'

interface Modals {
  [key: string]: boolean
}

const useModal = () => {
  const [modals, setModals] = useState<Modals>({})

  const openModal = (key: string) => {
    setModals((prev) => ({
      ...prev,
      [key]: true,
    }))
  }

  const closeModal = () => setModals({})

  const isOpen = (key: string) => modals[key]

  return {
    isOpen,
    openModal,
    closeModal,
  }
}

export default useModal
