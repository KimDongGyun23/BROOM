import { useFetchTotalPostCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalPostCountSection = () => {
  const { data: totalPostCount, isPending } = useFetchTotalPostCount()

  if (isPending) return null

  return (
    <InformationContainer>
      <Label>총 게시글 수</Label>
      <Count>{totalPostCount?.boardCount || '조회 불가'}</Count>
    </InformationContainer>
  )
}
