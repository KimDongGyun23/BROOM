import { useFormContext } from 'react-hook-form'

import { useFetchBusApplicationStatus } from '@/entities/bus/api/useBus.query'
import { BUS_APPLICATION_STATUS } from '@/entities/bus/config/bus.constant'
import { busStatusAttribute } from '@/entities/bus/config/bus.schema'
import { useBusApplicationStatusActions } from '@/features/check-bus-application/model/busApplication'
import { Button } from '@/shared/ui/Button'

export const CheckBusApplicationButton = () => {
  const { handleSubmit, watch } = useFormContext()

  const studentId = watch(busStatusAttribute.STUDENT_ID.section)

  const { setApplicationStatus } = useBusApplicationStatusActions()

  const { refetch: fetchApplicationStatus } = useFetchBusApplicationStatus({ urls: { studentId } })

  const handleClickButton = async () => {
    const { isSuccess } = await fetchApplicationStatus()

    if (isSuccess) setApplicationStatus(BUS_APPLICATION_STATUS.COMPLETED)
    else setApplicationStatus(BUS_APPLICATION_STATUS.NOT_FOUND)
  }

  return (
    <Button size="md" onClick={handleSubmit(handleClickButton)}>
      조회하기
    </Button>
  )
}
