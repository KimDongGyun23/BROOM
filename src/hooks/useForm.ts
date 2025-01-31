import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { instance } from '@/services/query'
import type { LoginCredentials, SignupData } from '@/types/auth'
import type { BusReservationCheck, BusReservationForm } from '@/types/bus'
import type { SearchType } from '@/types/common'
import type { MypageUser, NewPasswordForm } from '@/types/mypage'
import {
  accountSchema,
  busReserveInfoSchema,
  busSchema,
  loginSchema,
  newPasswordSchema,
  signupSchema,
} from '@/utils/schema'

export const useLoginForm = () => {
  const formMethod = useForm<LoginCredentials>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      userId: 'test01',
      password: 'password',
    },
    resolver: zodResolver(loginSchema),
  })

  return formMethod
}

export const useSignupForm = () => {
  const formMethod = useForm<SignupData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  })

  return formMethod
}

export const useAccountForm = () => {
  const getDefaultValues = async () => {
    const { nickname, dischargeYear, militaryChaplain } =
      await instance.get<MypageUser>(`/mypage/info`)
    return { nickname, dischargeYear, militaryChaplain }
  }

  const formMethod = useForm<MypageUser>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(accountSchema),
    defaultValues: getDefaultValues,
  })

  return formMethod
}

export const useSearchForm = (defaultValue: SearchType) => {
  const formMethod = useForm<SearchType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultValue,
  })

  return formMethod
}

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

export const useNewPasswordForm = () => {
  const formMethod = useForm<NewPasswordForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(newPasswordSchema),
  })

  return formMethod
}
