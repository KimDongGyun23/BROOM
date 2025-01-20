import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useBoolean } from '@/hooks/useBoolean'
import { useAccountForm } from '@/hooks/useForm'
import { useAccountUpdate } from '@/services/service/useAccountUpdate'
import { FORM_ATTRIBUTE } from '@/utils/constants'

type AccountFormType = {
  isEditMode: boolean
}

const AccountForm = ({ isEditMode }: AccountFormType) => {
  return (
    <form className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7">
      <InputGroup section={FORM_ATTRIBUTE.NICKNAME.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.NICKNAME.label} />
        <div className="flex gap-4">
          <InputGroup.Input readOnly={!isEditMode} {...FORM_ATTRIBUTE.NICKNAME.input} />
          {isEditMode && (
            <Button size="md" onClick={() => {}}>
              중복 확인
            </Button>
          )}
        </div>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.DISCHARGE_YEAR.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.DISCHARGE_YEAR.label} />
        <InputGroup.Input readOnly={!isEditMode} {...FORM_ATTRIBUTE.DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.SORT.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.SORT.label} />
        <InputGroup.SortOfArmy disabled={!isEditMode} />
      </InputGroup>
    </form>
  )
}

export const AccountInfo = () => {
  const formMethod = useAccountForm()
  const { handleSubmit } = formMethod

  const [isEditMode, enableEditMode, disableEditMode] = useBoolean(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { handleAccountUpdate } = useAccountUpdate(() => {
    openModal()
    disableEditMode()
  })

  const headerMode = isEditMode ? 'complete' : 'edit'

  return (
    <>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type={headerMode}
          title="계정 정보"
          onClickEdit={enableEditMode}
          onClickComplete={handleSubmit(handleAccountUpdate)}
        />
        <AccountForm isEditMode={isEditMode} />
      </FormProvider>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content="계정 정보가 수정되었습니다."
        button={{ onClick: closeModal, label: '완료' }}
      />
    </>
  )
}
