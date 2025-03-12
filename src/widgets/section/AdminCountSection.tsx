import { styled } from 'styled-components'

type AdminCountSectionProps = {
  label: string
  count: number | string
}

export const AdminCountSection = ({ label, count }: AdminCountSectionProps) => {
  return (
    <AdminInformationContainer>
      <AdminLabel>{label}</AdminLabel>
      <AdminCount>{count}</AdminCount>
    </AdminInformationContainer>
  )
}

const AdminInformationContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')}
`

const AdminLabel = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[600])}
`

const AdminCount = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.blue[500])}
`
