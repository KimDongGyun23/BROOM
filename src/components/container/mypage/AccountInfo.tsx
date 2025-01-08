import { FormProvider } from 'react-hook-form'

import { InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { Button } from '@/components/view/Button'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useAccountForm, useBoolean } from '@/hooks'
import { useAccountUpdate } from '@/services/service'

type AccountFormType = {
  isEditMode: boolean
}

const AccountForm = ({ isEditMode }: AccountFormType) => {
  return (
    <form className="flex-column scroll mx-4 mb-2 mt-7 grow gap-7">
      <InputGroup>
        <InputGroup.Label section="nickname">닉네임</InputGroup.Label>
        <div className="flex gap-4">
          <InputGroup.Input
            section="nickname"
            readOnly={!isEditMode}
            placeholder="최소 2글자, 최대 8글자"
          />
          {isEditMode && (
            <Button size="md" onClick={() => {}}>
              중복 확인
            </Button>
          )}
        </div>
      </InputGroup>

      <InputGroup>
        <InputGroup.Label section="dischargeYear">전역연도</InputGroup.Label>
        <InputGroup.Input
          section="dischargeYear"
          type="number"
          readOnly={!isEditMode}
          placeholder="숫자 4자리"
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Label section="militaryChaplain">복무했던 군종</InputGroup.Label>
        <InputGroup.SortOfArmy section="militaryChaplain" disabled={!isEditMode} />
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
