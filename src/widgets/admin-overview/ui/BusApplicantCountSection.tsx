import { useFetchBusTotalApplicantCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const BusApplicantCountSection = () => {
  const { data: totalApplicantCount, isPending } = useFetchBusTotalApplicantCount()

  if (isPending) return null

  return (
    <InformationContainer>
      <Label>버스 신청 인원 수</Label>
      <Count>{totalApplicantCount?.reservationCount || '조회 불가'}</Count>
    </InformationContainer>
  )
}
