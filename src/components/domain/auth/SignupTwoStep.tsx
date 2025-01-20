import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { useNicknameValidation } from '@/services/service/useNicknameValidation'
import { useStepsActions, useTotalStep } from '@/stores/steps'
import type { StepProps } from '@/types/common'
import { FORM_ATTRIBUTE } from '@/utils/constants'

export const SignupTwoStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { trigger, reset, watch } = useFormContext()
  const { goNextStep, goPreviousStep } = useStepsActions()
  const { validateNickname, isNicknameValid, nicknameValidationMessage } = useNicknameValidation()

  const watchNicknameField = watch(FORM_ATTRIBUTE.NICKNAME.section)

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  const handleNext = async () => {
    const isValid = await trigger([
      FORM_ATTRIBUTE.NICKNAME.section,
      FORM_ATTRIBUTE.DISCHARGE_YEAR.section,
      FORM_ATTRIBUTE.SORT.section,
    ])
    if (isValid && isNicknameValid) {
      goNextStep()
    }
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancel={goPreviousStep} onClickClose={handleClose} />
      <LabelWithStep currentStep={2} totalStep={totalStep} label={label} />

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup section={FORM_ATTRIBUTE.NICKNAME.section}>
          <InputGroup.Label
            label={FORM_ATTRIBUTE.NICKNAME.label}
            successMessage={isNicknameValid ? nicknameValidationMessage : null}
            errorMessage={!isNicknameValid ? nicknameValidationMessage : null}
          />
          <div className="flex gap-4">
            <InputGroup.Input {...FORM_ATTRIBUTE.NICKNAME.input} />
            <Button size="md" onClick={() => validateNickname(watchNicknameField)}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup section={FORM_ATTRIBUTE.DISCHARGE_YEAR.section}>
          <InputGroup.Label label={FORM_ATTRIBUTE.DISCHARGE_YEAR.label} />
          <InputGroup.Input {...FORM_ATTRIBUTE.DISCHARGE_YEAR.input} />
        </InputGroup>

        <InputGroup section={FORM_ATTRIBUTE.SORT.section}>
          <InputGroup.Label label={FORM_ATTRIBUTE.SORT.label} />
          <InputGroup.SortOfArmy />
        </InputGroup>
      </div>

      <Button
        size="lg"
        onClick={handleNext}
        className="mx-4 mb-10 mt-2"
        disabled={!isNicknameValid}
      >
        다음으로
      </Button>
    </>
  )
}
