import { styled } from 'styled-components'

import { useModalActions } from '@/shared/model/modal.store'

import type { AgreementId } from '../model/terms.store'

type Props = {
  id: AgreementId
}

export const TermViewButton = ({ id }: Props) => {
  const { openModal } = useModalActions()

  return (
    <ViewButton type="button" onClick={() => openModal(id, '')}>
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
