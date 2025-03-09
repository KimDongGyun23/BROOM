import { useState } from 'react'

type Modals = {
  [key: string]: boolean
}

type Labels = {
  [key: string]: string
}

export type OpenModal = (key: string, label: string) => void

const useModal = () => {
  const [modals, setModals] = useState<Modals>({})
  const [labels, setLabels] = useState<Labels>({})

  const openModal: OpenModal = (key, label) => {
    setModals(() => ({ [key]: true }))
    setLabels(() => ({ [key]: label }))
  }

  const closeModal = () => {
    setModals({})
    setLabels({})
  }

  const isModalOpen = (key: string) => modals[key]
  const modalLabel = (key: string) => labels[key]

  return {
    isModalOpen,
    modalLabel,
    openModal,
    closeModal,
  }
}

export default useModal
