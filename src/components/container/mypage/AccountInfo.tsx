import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useAccountForm } from '@/hooks/useForm'
import { useAccountUpdate } from '@/services/service/useAccountUpdate'
import { FORM_ATTRIBUTE } from '@/utils/constants'

type AccountFormType = {
  isEditMode: boolean
}

const AccountForm = ({ isEditMode }: AccountFormType) => {
  return (
    <FormContainer>
      <InputGroup section={FORM_ATTRIBUTE.NICKNAME.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.NICKNAME.label} />
        <InputContainer>
          <InputGroup.Input readOnly={!isEditMode} {...FORM_ATTRIBUTE.NICKNAME.input} />
          {isEditMode && (
            <Button size="md" onClick={() => {}}>
              중복 확인
            </Button>
          )}
        </InputContainer>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.DISCHARGE_YEAR.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.DISCHARGE_YEAR.label} />
        <InputGroup.Input readOnly={!isEditMode} {...FORM_ATTRIBUTE.DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.SORT.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.SORT.label} />
        <InputGroup.SortOfArmy disabled={!isEditMode} />
      </InputGroup>
    </FormContainer>
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

const FormContainer = styled.form`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xxl')};
  ${({ theme }) => theme.margin('container', 'container', 'container', 'container')};
  overflow-y: scroll;
`

const InputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')}
`
