import styled from 'styled-components'

import { Button } from '@/components/view/Button'

export const ValidateContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.xl};
`

export const FormContainer = styled.div`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '28px')};
  margin: 65px ${({ theme }) => theme.gap.xl} ${({ theme }) => theme.gap.md};
  overflow-y: scroll;
`

export const StyledButton = styled(Button)`
  margin: ${({ theme }) => theme.gap.md} ${({ theme }) => theme.gap.xl} 40px;
`

export const AllAgreementButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.md)};
  color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue[500] : theme.colors.black[500]};
`

export const AgreementList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '24px')};
`

export const AgreementItemContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center')};
`

export const AgreementToggleButton = styled.button<{ $isChecked: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.md)};

  .label {
    font-size: ${({ theme }) => theme.fontSize[600]};
    line-height: ${({ theme }) => theme.lineHeight[600]};
    color: ${({ theme, $isChecked }) =>
      $isChecked ? theme.colors.blue[500] : theme.colors.black[400]};
  }
`

export const ViewButton = styled.button`
  margin-left: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[400]};
  font-size: ${({ theme }) => theme.fontSize[800]};
  line-height: ${({ theme }) => theme.lineHeight[800]};
  color: ${({ theme }) => theme.colors.black[400]};
`
