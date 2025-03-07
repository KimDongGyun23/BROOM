import { useFetchTotalPostCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalPostCountSection = () => {
  const { data: totalPostCount } = useFetchTotalPostCount()

  return (
    <InformationContainer>
      <Label>총 게시글 수</Label>
      <Count>{totalPostCount?.count || '정보 없음'}</Count>
    </InformationContainer>
  )
}
