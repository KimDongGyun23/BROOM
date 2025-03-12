import { useFormContext } from 'react-hook-form'

import { useBusApplicationQuery } from '@/entities/bus/api/useBus.query'
import { BUS_APPLICATION_STATUS } from '@/entities/bus/config/bus.constant'
import { busStatusAttribute } from '@/entities/bus/config/bus.schema'
import { useBusApplicationStatusActions } from '@/features/check-bus-application/model/busApplication'
import { Button } from '@/shared/ui/Button'

export const CheckBusApplicationButton = () => {
  const { handleSubmit, watch } = useFormContext()

  const studentId = watch(busStatusAttribute.STUDENT_ID.section)

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
