import { useFetchTotalUserCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalUserCountSection = () => {
  const { data: totalUserCount, isPending } = useFetchTotalUserCount()

  if (isPending) return null

  return (
    <InformationContainer>
      <Label>총 가입된 회원 수</Label>
      <Count>{totalUserCount?.count || '조회 불가'}</Count>
    </InformationContainer>
  )
}
