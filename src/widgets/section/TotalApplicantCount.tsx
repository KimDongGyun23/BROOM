import { styled } from 'styled-components'

import { useFetchBusTotalApplicantCount } from '@/entities/admin/api/useAdmin.query'

export const TotalApplicantCount = () => {
  const { data, isPending, isError } = useFetchBusTotalApplicantCount()

  if (isPending || isError) return null

  return <CountText>총인원 수: {data.reservationCount}</CountText>
}

const CountText = styled.p`
  ${({ theme }) => `
    ${theme.font(700, theme.colors.black[600])};
    ${theme.margin(0, 0, 'sm')};
  `}
`
