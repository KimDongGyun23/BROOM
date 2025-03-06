import { styled } from 'styled-components'

import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ToggleButton } from '@/shared/ui/ToggleButton'

import { useToggleBusApplication } from '../hook/useToggleBusApplication'

type ToggleBusApplicationProps = {
  initialToggleState: boolean
}

const ToggleWithModal = ({ initialToggleState }: ToggleBusApplicationProps) => {
  const { handleToggleBusApplication } = useToggleBusApplication()

  return (
    <Container>
      <Label>버스 신청 활성화</Label>
      <ToggleButton initialToggleState={initialToggleState} onClick={handleToggleBusApplication} />
    </Container>
  )
}

export const ToggleBusApplication = ({ initialToggleState }: ToggleBusApplicationProps) => (
  <ModalStoreProvider>
    <ToggleWithModal initialToggleState={initialToggleState} />
  </ModalStoreProvider>
)

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};
`

const Label = styled.div`
  ${({ theme }) => theme.font(700, theme.colors.black[600])};
`
