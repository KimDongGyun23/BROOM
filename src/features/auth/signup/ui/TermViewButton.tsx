import { styled } from 'styled-components'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

export const TermViewButton = () => {
  const { openModal } = useModalActions()

  return (
    <ViewButton type="button" onClick={() => openModal(MODAL_KEYS.TERM, '')}>
      보기
    </ViewButton>
  )
}

const ViewButton = styled.button`
  ${({ theme }) => `
    ${theme.font(800, theme.colors.black[400])};
    ${theme.margin(0, 0, 0, 'auto')};
    ${theme.border('underline', 'bottom')};
  `}
`
