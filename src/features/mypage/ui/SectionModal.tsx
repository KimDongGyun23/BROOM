import { TermModal } from '@/features/agree-term/ui/TermViewButton'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

const CHANNEL = import.meta.env.VITE_KAKAO

type SectionModalProps = {
  index: number
  isModalOpen: boolean
  closeModal: VoidFunction
}

export const SectionModal = ({ index, isModalOpen, closeModal }: SectionModalProps) => {
  switch (index) {
    case 0:
      return (
        <ModalWithTwoButton
          label="문의하기 채널로 이동하시겠습니까?"
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          primaryButton={{
            buttonLabel: '확인',
            onClickButton: () => {
              window.open(CHANNEL, '_blank')
              closeModal()
            },
          }}
        />
      )
    case 1:
      return <TermModal id="personalConsent" isModalOpen={isModalOpen} closeModal={closeModal} />
    case 2:
      return <TermModal id="serviceConsent" isModalOpen={isModalOpen} closeModal={closeModal} />
    default:
      return null
  }
}
