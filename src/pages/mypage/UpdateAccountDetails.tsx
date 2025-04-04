import { FormProvider } from 'react-hook-form'

import { useFetchAccountDetails } from '@/entities/mypage/api/useMypage.query'
import type { AccountDetails } from '@/entities/mypage/model/mypage.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import useModal from '@/shared/hook/useModal'
import { ERROR_MESSAGES, MODAL_KEYS } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { accountSchema } from '@/widgets/form/schema/account.schema'
import { UpdateAccountForm } from '@/widgets/form/UpdateAccountForm'
import { UpdateAccountHeader } from '@/widgets/header/EditAccountHeader'
import { UpdateAccountSuccessModal } from '@/widgets/modal/UpdateAccountSuccessModal'

export const UpdateAccountDetails = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { data: defaultValues } = useFetchAccountDetails()

  const formMethod = useCustomForm<AccountDetails>(accountSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <UpdateAccountHeader openModal={openModal} />
      <UpdateAccountForm />

      <UpdateAccountSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </FormProvider>
  )
}
