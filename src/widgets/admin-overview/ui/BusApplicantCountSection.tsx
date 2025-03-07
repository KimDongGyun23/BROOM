import { useFetchBusTotalApplicantCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const BusApplicantCountSection = () => {
  const { data: totalApplicantCount } = useFetchBusTotalApplicantCount()

  return (
    <InformationContainer>
      <Label>버스 신청 인원 수</Label>
      <Count>{totalApplicantCount?.reservationCount || '정보 없음'}</Count>
    </InformationContainer>
  )
}
