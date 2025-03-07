import { useEffect, useState } from 'react'

import { useFetchTotalPostCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalPostCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalPostCount, isError } = useFetchTotalPostCount()

  useEffect(() => {
    if (totalPostCount && totalPostCount.boardCount) setCount(totalPostCount.boardCount)
  }, [totalPostCount])

  if (isError) setCount('조회 불가')

  return (
    <InformationContainer>
      <Label>총 게시글 수</Label>
      <Count>{count}</Count>
    </InformationContainer>
  )
}
