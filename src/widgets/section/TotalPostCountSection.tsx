import { useEffect, useState } from 'react'

import { AdminCount, AdminInformationContainer, AdminLabel } from '@/app/style/commonStyles'
import { useFetchTotalPostCount } from '@/entities/admin/api/useAdmin.query'

export const TotalPostCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalPostCount, isError } = useFetchTotalPostCount()

  useEffect(() => {
    if (totalPostCount && totalPostCount.boardCount !== undefined)
      setCount(totalPostCount.boardCount)
  }, [totalPostCount])

  if (isError) setCount('조회 불가')

  return (
    <AdminInformationContainer>
      <AdminLabel>총 게시글 수</AdminLabel>
      <AdminCount>{count}</AdminCount>
    </AdminInformationContainer>
  )
}
