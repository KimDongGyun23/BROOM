import { useEffect, useState } from 'react'

import { useFetchBusTotalApplicantCount } from '@/entities/admin/api/useAdmin.query'

import { Count, InformationContainer, Label } from './SectionStyle'

export const BusApplicantCountSection = () => {
  const [count, setCount] = useState<number | string>('')

  const { data: totalApplicantCount, isError } = useFetchBusTotalApplicantCount()

  useEffect(() => {
    if (totalApplicantCount && totalApplicantCount.reservationCount)
      setCount(totalApplicantCount.reservationCount)
  }, [totalApplicantCount])

  if (isError) setCount('조회 불가')

  return (
    <InformationContainer>
      <Label>버스 신청 인원 수</Label>
      <Count>{count}</Count>
    </InformationContainer>
  )
}
