import { useFormContext } from 'react-hook-form'

import { useBusApplicationQuery } from '@/entities/bus/api/useBus.query'
import { BUS_APPLICATION_STATUS } from '@/entities/bus/config/bus.constant'
import { busReserveInfoAttribute } from '@/entities/bus/config/bus.schema'
import { Button } from '@/shared/ui/Button'

import { useBusApplicationStatusActions } from '../model/busApplication'

export const CheckBusApplicationButton = () => {
  const { handleSubmit, watch } = useFormContext()

  const studentId = watch(busReserveInfoAttribute.STUDENT_ID.section)

  const { setApplicationStatus } = useBusApplicationStatusActions()

  const { refetch: fetchBusApplication } = useBusApplicationQuery({ urls: { studentId } })

  const fetchApplicationStatus = async () => {
    const { data, isSuccess } = await fetchBusApplication()

    if (isSuccess && data.reserved) setApplicationStatus(BUS_APPLICATION_STATUS.COMPLETED)
    else setApplicationStatus(BUS_APPLICATION_STATUS.NOT_FOUND)
  }

  return (
    <Button size="md" onClick={handleSubmit(fetchApplicationStatus)}>
      조회하기
    </Button>
  )
}
