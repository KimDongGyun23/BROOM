import { useFetchTotalUserCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalUserCountSection = () => {
  const { data: totalUserCount } = useFetchTotalUserCount()

  return (
    <InformationContainer>
      <Label>총 가입된 회원 수</Label>
      <Count>{totalUserCount?.count || '정보 없음'}</Count>
    </InformationContainer>
  )
}
