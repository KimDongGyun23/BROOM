import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { api } from '@/services/query'
import type {
  BusFormType,
  BusReservedInfo,
  CarpoolEditPageRequest,
  CarpoolEditResponse,
  CarpoolForm,
  LoginFormType,
  MypageAccountResponse,
  NewPasswordFormType,
  SearchType,
  SignupFormType,
  TeamEditPageRequest,
  TeamEditResponse,
  TeamForm,
  UserAccountFormType,
} from '@/types'
import {
  accountSchema,
  busReserveInfoSchema,
  busSchema,
  carpoolSchema,
  loginSchema,
  newPasswordSchema,
  signupSchema,
  teamSchema,
} from '@/utils/schema'

export const useLoginForm = () => {
  const formMethod = useForm<LoginFormType>({
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
  const formMethod = useForm<SignupFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  })

  return formMethod
}

export const useAccountForm = () => {
  const getDefaultValues = async () => {
    const { nickname, dischargeYear, militaryChaplain } =
      await api.get<MypageAccountResponse>(`/mypage/info`)
    return { nickname, dischargeYear, militaryChaplain }
  }

  const formMethod = useForm<UserAccountFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(accountSchema),
    defaultValues: getDefaultValues,
  })

  return formMethod
}

export const useCarpoolCreateForm = () => {
  const formMethod = useForm<CarpoolForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(carpoolSchema),
  })

  return formMethod
}

export const useCarpoolEditForm = ({ urls }: CarpoolEditPageRequest) => {
  const getDefaultValues = async () => {
    const { departTime, trainingDate, ...rest } = await api.get<CarpoolEditResponse>(
      `/carpool/edit/${urls.carpoolBoardId}`,
    )
    const hour = parseInt(departTime.split(':')[0], 10)
    const minute = parseInt(departTime.split(':')[1], 10)
    const date = dayjs(trainingDate).format('YYYYMMDD')

    return { hour, minute, trainingDate: date, ...rest }
  }

  const formMethod = useForm<CarpoolForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(carpoolSchema),
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
  const formMethod = useForm<TeamForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(teamSchema),
  })

  return formMethod
}

export const useTeamEditForm = ({ urls }: TeamEditPageRequest) => {
  const getDefaultValues = async () => {
    const { meetingTime, trainingDate, ...rest } = await api.get<TeamEditResponse>(
      `/team/edit/${urls.teamBoardId}`,
    )

    const hour = parseInt(meetingTime.split(':')[0], 10)
    const minute = parseInt(meetingTime.split(':')[1], 10)
    const date = dayjs(trainingDate).format('YYYYMMDD')

    return { hour, minute, trainingDate: date, ...rest }
  }

  const formMethod = useForm<TeamForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(teamSchema),
    defaultValues: getDefaultValues,
  })

  return formMethod
}

export const useBusForm = () => {
  const formMethod = useForm<BusFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(busSchema),
  })

  return formMethod
}

export const useBusReservedInfoForm = () => {
  const formMethod = useForm<BusReservedInfo>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(busReserveInfoSchema),
  })

  return formMethod
}

export const useNewPasswordForm = () => {
  const formMethod = useForm<NewPasswordFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(newPasswordSchema),
  })

  return formMethod
}
