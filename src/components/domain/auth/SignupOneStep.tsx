import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, InputGroup, LabelWithStep, SubHeaderWithIcon } from '@/components/view'
import { useIdValidation } from '@/services/service'
import { useStepsActions, useTotalStep } from '@/stores'
import type { StepProps } from '@/types'

export const SignupOneStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { goNextStep } = useStepsActions()
  const { trigger, watch } = useFormContext()
  const { validateId, isIdValid, idValidationMessage } = useIdValidation()

  const watchUserIdField = watch('userId')

  const handleClose = () => navigate('/login')

  const handleNext = async () => {
    const isValid = await trigger(['userId', 'password', 'confirm'])
    if (isValid && isIdValid) {
      goNextStep()
    }
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancle={handleClose} onClickClose={handleClose} />

      <LabelWithStep currentStep={1} totalStep={totalStep}>
        {label}
      </LabelWithStep>

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup>
          <InputGroup.Label
            section="userId"
            customSuccessMessage={isIdValid ? idValidationMessage : null}
            customErrorMessage={!isIdValid ? idValidationMessage : null}
          >
            아이디
          </InputGroup.Label>
          <div className="flex gap-4">
            <InputGroup.Input section="userId" placeholder="최소 6글자, 최대 12글자" />
            <Button size="md" onClick={() => validateId(watchUserIdField)}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="password">비밀번호</InputGroup.Label>
          <InputGroup.Input
            section="password"
            type="password"
            placeholder="최소 8글자, 최대 16글자"
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="confirm">비밀번호 확인</InputGroup.Label>
          <InputGroup.Input
            section="confirm"
            type="password"
            placeholder="최소 8글자, 최대 16글자"
          />
        </InputGroup>
      </div>

      <Button size="lg" onClick={handleNext} disabled={!isIdValid} classname="mt-2 mb-10 mx-4">
        다음으로
      </Button>
    </>
  )
}
