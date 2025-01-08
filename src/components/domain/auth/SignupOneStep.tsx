import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { SubHeaderWithIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { useIdValidation } from '@/services/service'
import { useStepsActions, useTotalStep } from '@/stores'
import type { StepProps } from '@/types'

export const SignupOneStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { goNextStep } = useStepsActions()
  const { trigger, reset, watch } = useFormContext()
  const { validateId, isIdValid, idValidationMessage } = useIdValidation()

  const watchUserIdField = watch('userId')

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  const handleNext = async () => {
    const isValid = await trigger(['userId', 'password', 'confirm'])
    if (isValid && isIdValid) {
      goNextStep()
    }
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancel={handleClose} onClickClose={handleClose} />
      <LabelWithStep currentStep={1} totalStep={totalStep} label={label} />

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup>
          <InputGroup.Label
            section="userId"
            label="아이디"
            successMessage={isIdValid ? idValidationMessage : null}
            errorMessage={!isIdValid ? idValidationMessage : null}
          />
          <div className="flex gap-4">
            <InputGroup.Input section="userId" placeholder="최소 6글자, 최대 12글자" />
            <Button size="md" onClick={() => validateId(watchUserIdField)}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="password" label="비밀번호" />
          <InputGroup.Input
            section="password"
            type="password"
            placeholder="최소 8글자, 최대 16글자"
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="confirm" label="비밀번호 확인" />
          <InputGroup.Input
            section="confirm"
            type="password"
            placeholder="최소 8글자, 최대 16글자"
          />
        </InputGroup>
      </div>

      <Button size="lg" onClick={handleNext} disabled={!isIdValid} className="mx-4 mb-10 mt-2">
        다음으로
      </Button>
    </>
  )
}
