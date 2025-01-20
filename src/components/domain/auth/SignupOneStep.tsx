import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useIdValidation } from '@/services/service/useIdValidation'
import { useStepsActions, useTotalStep } from '@/stores/steps'
import type { StepProps } from '@/types/common'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${({ theme }) => theme.gap.lg};
  margin-top: 65px;
  margin-bottom: ${({ theme }) => theme.gap.sm};
  flex-grow: 1;
  gap: ${({ theme }) => theme.gap.xl};
  overflow-y: scroll;
`

const InputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.lg};
`

const StyledButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.gap.lg};
  margin-top: ${({ theme }) => theme.gap.sm};
  margin-bottom: 40px;
`

export const SignupOneStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { goNextStep } = useStepsActions()
  const { trigger, reset, watch } = useFormContext()
  const { validateId, isIdValid, idValidationMessage } = useIdValidation()

  const watchUserIdField = watch(FORM_ATTRIBUTE.SIGNUP_ID.section)

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  const handleNext = async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.SIGNUP_ID.section,
      FORM_ATTRIBUTE.SIGNUP_PASSWORD.section,
      FORM_ATTRIBUTE.CONFIRM.section,
    ])
    if (isValid && isIdValid) {
      goNextStep()
    }
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancel={handleClose} onClickClose={handleClose} />
      <LabelWithStep currentStep={1} totalStep={totalStep} label={label} />

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup section={FORM_ATTRIBUTE.SIGNUP_ID.section}>
          <InputGroup.Label
            label={FORM_ATTRIBUTE.SIGNUP_ID.label}
            successMessage={isIdValid ? idValidationMessage : null}
            errorMessage={!isIdValid ? idValidationMessage : null}
          />
          <div className="flex gap-4">
            <InputGroup.Input {...FORM_ATTRIBUTE.SIGNUP_ID.input} />
            <Button size="md" onClick={() => validateId(watchUserIdField)}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup section={FORM_ATTRIBUTE.SIGNUP_PASSWORD.section}>
          <InputGroup.Label label={FORM_ATTRIBUTE.SIGNUP_PASSWORD.label} />
          <InputGroup.Input {...FORM_ATTRIBUTE.SIGNUP_PASSWORD.input} />
        </InputGroup>

        <InputGroup section={FORM_ATTRIBUTE.CONFIRM.section}>
          <InputGroup.Label label={FORM_ATTRIBUTE.CONFIRM.label} />
          <InputGroup.Input {...FORM_ATTRIBUTE.CONFIRM.input} />
        </InputGroup>
      </div>

      <Button size="lg" onClick={handleNext} disabled={!isIdValid} className="mx-4 mb-10 mt-2">
        다음으로
      </Button>
    </>
  )
}
