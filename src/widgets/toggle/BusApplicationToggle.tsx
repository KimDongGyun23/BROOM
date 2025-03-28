import { useToggleBusApplication } from '@/features/toggle-bus-application/hook/useToggleBusApplication'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ToggleButton } from '@/shared/ui/ToggleButton'

import { ToggleBusApplicationSuccessModal } from './ToggleBusApplicationSuccessModal'

type BusApplicationToggleProps = {
  isToggled: boolean
}

export const BusApplicationToggle = ({ isToggled }: BusApplicationToggleProps) => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { handleToggleBusApplication } = useToggleBusApplication(openModal)

  return (
    <>
      <ToggleButton isToggled={isToggled} onClick={handleToggleBusApplication} />

      <ToggleBusApplicationSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
