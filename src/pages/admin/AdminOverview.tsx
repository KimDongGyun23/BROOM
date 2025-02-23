import styled from 'styled-components'

import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

const dummy = [
  { label: '총 게시글 수', key: 'post', number: 32 },
  { label: '버스 신청 인원 수', key: 'bus', number: 24 },
  { label: '총 가입자 수', key: 'sign-up', number: 59 },
  { label: '신규 가입자 수 (최근 7일)', key: 'new-sign-in', number: 21 },
]

export const AdminOverview = () => {
  return (
    <>
      <SubHeaderWithoutIcon type="null" title="운영 현황" />

      <Container>
        {dummy.map(({ label, key, number }) => (
          <InformationContainer key={key}>
            <p className="information-label">{label}</p>
            <p className="information-number">{number}</p>
          </InformationContainer>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container')};
  height: 100%;
`

const InformationContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between')};

  .information-label {
    ${({ theme }) => theme.font(700, theme.colors.black[600])};
  }

  .information-number {
    ${({ theme }) => theme.font(700, theme.colors.blue[500])};
  }
`
