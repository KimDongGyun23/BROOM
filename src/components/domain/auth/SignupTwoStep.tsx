import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup, SubHeaderWithIcon } from '@/components/view'
import { Button } from '@/components/view/Button'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { useNicknameValidation } from '@/services/service'
import { useStepsActions, useTotalStep } from '@/stores'
import type { StepProps } from '@/types'

export const SignupTwoStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { trigger, reset, watch } = useFormContext()
  const { goNextStep, goPreviousStep } = useStepsActions()
  const { validateNickname, isNicknameValid, nicknameValidationMessage } = useNicknameValidation()

  const watchNicknameField = watch('nickname')

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  const handleNext = async () => {
    const isValid = await trigger(['nickname', 'dischargeYear', 'militaryChaplain'])
    if (isValid && isNicknameValid) {
      goNextStep()
    }
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancle={goPreviousStep} onClickClose={handleClose} />
      <LabelWithStep currentStep={2} totalStep={totalStep} label={label} />

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <InputGroup>
          <InputGroup.Label
            section="nickname"
            customSuccessMessage={isNicknameValid ? nicknameValidationMessage : null}
            customErrorMessage={!isNicknameValid ? nicknameValidationMessage : null}
          >
            닉네임
          </InputGroup.Label>
          <div className="flex gap-4">
            <InputGroup.Input section="nickname" placeholder="최소 2글자, 최대 8글자" />
            <Button size="md" onClick={() => validateNickname(watchNicknameField)}>
              중복 확인
            </Button>
          </div>
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="dischargeYear">전역연도</InputGroup.Label>
          <InputGroup.Input section="dischargeYear" type="number" placeholder="숫자 4자리" />
        </InputGroup>

        <InputGroup>
          <InputGroup.Label section="militaryChaplain">복무했던 군종</InputGroup.Label>
          <InputGroup.SortOfArmy section="militaryChaplain" />
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
