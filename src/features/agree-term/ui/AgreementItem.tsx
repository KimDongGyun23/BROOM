import { styled } from 'styled-components'

import { CheckIcon } from '@/shared/ui/icons/ActiveIcons'

import type { AgreementId } from '../model/terms.store'
import { useTermsActions } from '../model/terms.store'

type AgreementItemProps = {
  id: AgreementId
  text: string
  isChecked: boolean
}

export const AgreementItem = ({ id, text, isChecked }: AgreementItemProps) => {
  const { toggleAgreement } = useTermsActions()

  return (
    <Container>
      <AgreementToggleButton
        type="button"
        onClick={() => toggleAgreement(id)}
        $isChecked={isChecked}
      >
        <CheckIcon active={isChecked} />
        <p className="label">{text}</p>
      </AgreementToggleButton>
      <ViewButton type="button">보기</ViewButton>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
`

const AgreementToggleButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};

  .label {
    ${({ theme, $isChecked }) =>
      theme.font(600, $isChecked ? theme.colors.blue[500] : theme.colors.black[400])};
  }
`

const ViewButton = styled.button`
  ${({ theme }) => `
    ${theme.font(800, theme.colors.black[400])};
    ${theme.margin(0, 0, 0, 'auto')};
    ${theme.border('underline', 'bottom')};
  `}
`
