import { styled } from 'styled-components'

import { CheckIcon } from '@/shared/ui/icons/ActiveIcons'

import type { AgreementId } from '../model/terms.store'
import { useTermsActions } from '../model/terms.store'

import { TermModal } from './TermModal'
import { TermViewButton } from './TermViewButton'

type Props = {
  id: AgreementId
  text: string
  isChecked: boolean
}

export const AgreementItem = ({ id, text, isChecked }: Props) => {
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

      <TermViewButton id={id} />
      <TermModal id={id} />
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
