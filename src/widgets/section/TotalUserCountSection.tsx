import { useEffect, useState } from 'react'

import { AdminCount, AdminInformationContainer, AdminLabel } from '@/app/style/commonStyles'
import { useFetchTotalUserCount } from '@/entities/admin/api/useAdmin.query'

export const TotalUserCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalUserCount, isError } = useFetchTotalUserCount()

  useEffect(() => {
    if (totalUserCount && totalUserCount.userCount !== undefined) setCount(totalUserCount.userCount)
  }, [totalUserCount])

  if (isError) setCount('조회 불가')

  return (
    <AdminInformationContainer>
      <AdminLabel>총 가입된 회원 수</AdminLabel>
      <AdminCount>{count}</AdminCount>
    </AdminInformationContainer>
  )
}
