import { useCallback } from 'react'

import type { MypageUser } from '@/types/mypage'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

import { useUpdateUserAccount } from '../query'

type ReturnType = (onSuccess: VoidFunction) => {
  handleAccountUpdate: (formData: MypageUser) => void
}

export const useAccountUpdate: ReturnType = (onSuccess) => {
  const { mutate: updateAccount } = useUpdateUserAccount()

  const handleAccountUpdate = useCallback(
    (formData: MypageUser) => {
      updateAccount(
        { body: formData },
        {
          onSuccess: () => {
            setSessionStorageItem(SESSION_KEYS.MILITARY_CHAPLAIN, formData.militaryChaplain)
            setSessionStorageItem(SESSION_KEYS.NICKNAME, formData.nickname)
            onSuccess()
          },
        },
      )
    },
    [updateAccount, onSuccess],
  )

  return { handleAccountUpdate }
}
