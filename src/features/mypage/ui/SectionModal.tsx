import { TermModal } from '@/features/auth/signup/ui/TermModal'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithTwoButton } from '@/shared/ui/modal/ButtonModal'

const CHANNEL = import.meta.env.VITE_KAKAO

type Props = {
  index: number
  name: string
}

export const SectionModal = ({ index, name }: Props) => {
  const { closeModal } = useModalActions()

  switch (index) {
    case 0:
      return (
        <ModalWithTwoButton
          modalKey={name}
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
      return <TermModal id="personalConsent" />
    case 2:
      return <TermModal id="serviceConsent" />
    default:
      return null
  }
}
