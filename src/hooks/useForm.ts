import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { BusReservationCheck } from '@/types/bus'
import { busReserveInfoSchema } from '@/utils/schema'

export const useBusReservedInfoForm = () => {
  const formMethod = useForm<BusReservationCheck>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(busReserveInfoSchema),
  })

  return formMethod
}
