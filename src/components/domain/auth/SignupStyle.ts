import styled from 'styled-components'

import { Button } from '@/components/view/Button'

export const ValidateContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`

export const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 0, '4xl')};
`

export const AllAgreementButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  ${({ theme, $isChecked }) =>
    theme.font(400, $isChecked ? theme.colors.blue[500] : theme.colors.black[500])};
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
  ${({ theme }) => theme.font(800, theme.colors.black[400])};
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
  ${({ theme }) => theme.border('underline', 'bottom')};
`
