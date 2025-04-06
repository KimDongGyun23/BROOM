import { styled } from 'styled-components'

import { AllCheckIcon } from '@/shared/ui/icons/ActiveIcons'

import { useIsAllChecked, useTermsActions } from '../model/terms.store'

export const AllAgreementButton = () => {
  const isAllChecked = useIsAllChecked()
  const { toggleAllAgreements } = useTermsActions()

  return (
    <StyledButton type="button" onClick={toggleAllAgreements} $isChecked={isAllChecked}>
      <AllCheckIcon active={isAllChecked} />
      <h4>모두 동의합니다.</h4>
    </StyledButton>
  )
}

export const StyledButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  ${({ theme, $isChecked }) =>
    theme.font(400, $isChecked ? theme.colors.blue[500] : theme.colors.black[500])};
`
