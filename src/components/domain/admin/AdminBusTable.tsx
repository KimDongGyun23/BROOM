import { styled } from 'styled-components'

const dummyData = [
  { name: '홍길동', studentId: 20231234, phone: '01012345678' },
  { name: '홍길동', studentId: 20231233, phone: '01012345678' },
  { name: '홍길동', studentId: 20231232, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
  { name: '홍길동', studentId: 20231231, phone: '01012345678' },
]

type BusTableRowType = {
  name: string
  studentId: number
  phone: string
}

const BusTableRow = ({ name, studentId, phone }: BusTableRowType) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{studentId}</td>
      <td>{phone}</td>
    </tr>
  )
}

export const AdminBusTable = () => {
  return (
    <>
      <TotalApplicant>총인원 수: 32</TotalApplicant>
      <StyledTable>
        <thead>
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>연락처</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((applicant, index) => (
            <BusTableRow key={index} {...applicant} />
          ))}
        </tbody>
      </StyledTable>
    </>
  )
}

const TotalApplicant = styled.p`
  ${({ theme }) => theme.font(700, theme.colors.black[600])};
  ${({ theme }) => theme.margin(0, 0, 'sm')};
`

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
