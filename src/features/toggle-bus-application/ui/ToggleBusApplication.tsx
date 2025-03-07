import { styled } from 'styled-components'

import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { ToggleButton } from '@/shared/ui/ToggleButton'

import { useToggleBusApplication } from '../hook/useToggleBusApplication'

type ToggleBusApplicationProps = {
  isToggled: boolean
}

const ToggleWithModal = ({ isToggled }: ToggleBusApplicationProps) => {
  const { handleToggleBusApplication } = useToggleBusApplication()

  return (
    <Container>
      <Label>버스 신청 활성화</Label>
      <ToggleButton isToggled={isToggled} onClick={handleToggleBusApplication} />
      <ModalWithOneButton />
    </Container>
  )
}

export const ToggleBusApplication = ({ isToggled }: ToggleBusApplicationProps) => (
  <ModalStoreProvider>
    <ToggleWithModal isToggled={isToggled} />
  </ModalStoreProvider>
)

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
`

const Label = styled.div`
  ${({ theme }) => theme.font(700, theme.colors.black[600])};
`
