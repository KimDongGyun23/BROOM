import { useEffect, useState } from 'react'

import { AdminCount, AdminInformationContainer, AdminLabel } from '@/app/style/commonStyles'
import { useFetchBusTotalApplicantCount } from '@/entities/admin/api/useAdmin.query'

export const BusApplicantCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalApplicantCount, isError } = useFetchBusTotalApplicantCount()

  useEffect(() => {
    if (totalApplicantCount && totalApplicantCount.reservationCount !== undefined)
      setCount(totalApplicantCount.reservationCount)
  }, [totalApplicantCount])

  if (isError) setCount('조회 불가')

  return (
    <AdminInformationContainer>
      <AdminLabel>버스 신청 인원 수</AdminLabel>
      <AdminCount>{count}</AdminCount>
    </AdminInformationContainer>
  )
}
