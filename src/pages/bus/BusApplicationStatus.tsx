import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { busReserveInfoSchema } from '@/entities/bus/config/bus.schema'
import type { StudentId } from '@/entities/bus/model/bus.type'
import { BusApplicationStatusTable } from '@/features/check-bus-application/ui/BusApplicationStatusTable'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { BusApplicationStatusForm } from '@/widgets/bus-form/ui/BusApplicationStatusForm'

export const BusApplicationStatus = () => {
  const formMethod = useCustomForm<StudentId>(busReserveInfoSchema)

  return (
    <>
      <SubHeaderWithoutIcon type="null" />
      <Container>
        <FormProvider {...formMethod}>
          <Title>신청 내역 조회</Title>
          <BusApplicationStatusForm />
        </FormProvider>

        <BusApplicationStatusTable />
        <NoticeContainer>
          <li>개인 정보 보호를 위해 신청 여부만 확인 가능합니다.</li>
          <li>기타 문의사항이 있다면 공지사항의 연락수단을 확인해주세요.</li>
        </NoticeContainer>
      </Container>
    </>
  )
}

const Title = styled.h4`
  ${({ theme }) => `
    ${theme.margin('page-label')}
    ${theme.font(400, theme.colors.black[600])}
  `}
`

const NoticeContainer = styled.ul`
  ${({ theme }) => `
    ${theme.flexBox('column')}
    ${theme.margin('container')}
  `}

  & > li {
    ${({ theme }) => theme.font(900, theme.colors.black[300])}
  }
`
