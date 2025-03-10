import { styled } from 'styled-components'

import { useFetchBusApplicantList } from '@/entities/admin/api/useAdmin.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'

export const BusApplicantTable = () => {
  const { data, isError } = useFetchBusApplicantList()

  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>연락처</th>
          </tr>
        </thead>
        <tbody>
          {data.result.map(({ reservationId, name, studentId, phoneNumber }) => (
            <tr key={reservationId}>
              <td>{name}</td>
              <td>{studentId}</td>
              <td>{phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    ${({ theme }) => theme.padding('sm')};
    border: 1px solid #ddd;
  }

  th {
    ${({ theme }) => theme.font(800, theme.colors.black[100])};
    background-color: ${({ theme }) => theme.colors.black[600]};
  }

  td {
    ${({ theme }) => theme.font(900, theme.colors.black[600])};
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.black[200]};
  }
`
