import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { BusReservationCheck, BusReservationForm } from '@/types/bus'
import { busReserveInfoSchema, busSchema } from '@/utils/schema'

export const useBusForm = () => {
  const formMethod = useForm<BusReservationForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(busSchema),
  })

  return formMethod
}

export const useBusReservedInfoForm = () => {
  const formMethod = useForm<BusReservationCheck>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(busReserveInfoSchema),
  })

  return formMethod
}
