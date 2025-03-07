import { useEffect, useState } from 'react'

import { useFetchTotalUserCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const TotalUserCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalUserCount, isError } = useFetchTotalUserCount()

  useEffect(() => {
    if (totalUserCount && totalUserCount.userCount) setCount(totalUserCount.userCount)
  }, [totalUserCount])

  if (isError) return setCount('조회 불가')

  return (
    <InformationContainer>
      <Label>총 가입된 회원 수</Label>
      <Count>{count}</Count>
    </InformationContainer>
  )
}
