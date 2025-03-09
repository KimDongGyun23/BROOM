import { useState } from 'react'

type Modals = {
  [key: string]: boolean
}

type Labels = {
  [key: string]: string
}

const useModal = () => {
  const [modals, setModals] = useState<Modals>({})
  const [labels, setLabels] = useState<Labels>({})

  const openModal = (key: string, label: string) => {
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
