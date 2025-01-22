import styled from 'styled-components'

import { Button } from '@/components/view/Button'

export const ValidateContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`

export const FormContainer = styled.div`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('sign-up-form-top', 'container', 'container', 'container')};
  overflow-y: scroll;
`

export const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('container', 'container', 'sign-up-button-bottom', 'container')};
`

export const AllAgreementButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue[500] : theme.colors.black[500]};
`

export const AgreementList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
`

export const AgreementItemContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
`

export const AgreementToggleButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};

  .label {
    ${({ theme, $isChecked }) =>
      theme.font(600, $isChecked ? theme.colors.blue[500] : theme.colors.black[400])};
  }
`

export const ViewButton = styled.button`
  margin-left: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[400]};
  ${({ theme }) => theme.font(800, theme.colors.black[400])};
`
