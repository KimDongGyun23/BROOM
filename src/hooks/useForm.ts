import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { api } from '@/services/query'
import type { LoginCredentials, SignupData } from '@/types/auth'
import type { BusReservationCheck, BusReservationForm } from '@/types/bus'
import type { SearchType } from '@/types/common'
import type { MypageUser, NewPasswordForm } from '@/types/mypage'
import type { PostContent, PostEditPageRequest, PostForm } from '@/types/post'
import {
  accountSchema,
  busReserveInfoSchema,
  busSchema,
  loginSchema,
  newPasswordSchema,
  signupSchema,
  teamSchema,
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
    const { nickname, dischargeYear, militaryChaplain } = await api.get<MypageUser>(`/mypage/info`)
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

export const useTeamCreateForm = () => {
  const formMethod = useForm<PostForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(teamSchema),
  })

  return formMethod
}

export const useTeamEditForm = ({ urls }: PostEditPageRequest) => {
  const getDefaultValues = async () => {
    const { time, trainingDate, ...rest } = await api.get<PostContent>(`/team/edit/${urls.boardId}`)

    const hour = parseInt(time.split(':')[0], 10)
    const minute = parseInt(time.split(':')[1], 10)
    const date = dayjs(trainingDate).format('YYYYMMDD')

    return { hour, minute, trainingDate: date, ...rest }
  }

  const formMethod = useForm<PostForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(teamSchema),
    defaultValues: getDefaultValues,
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
