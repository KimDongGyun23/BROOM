import styled from 'styled-components'

import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { BusApplicantCountSection } from '@/widgets/section/BusApplicantCountSection'
import { TotalPostCountSection } from '@/widgets/section/TotalPostCountSection'
import { TotalUserCountSection } from '@/widgets/section/TotalUserCountSection'

export const AdminOverview = () => {
  return (
    <>
      <SubHeaderWithoutIcon type="null" title="운영 현황" />

      <Container>
        <TotalUserCountSection />
        <TotalPostCountSection />
        <BusApplicantCountSection />
      </Container>
    </>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container')};
  height: 100%;
`
