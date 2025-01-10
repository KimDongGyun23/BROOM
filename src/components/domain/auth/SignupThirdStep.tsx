import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { SubHeaderWithIcon } from '@/components/view/header/SubHeader'
import { AllCheckIcon, CheckIcon } from '@/components/view/icons/ActiveIcons'
import { LabelWithStep } from '@/components/view/LabelWithStep'
import { useStepsActions, useTotalStep } from '@/stores/steps'
import type { StepProps } from '@/types/common'

type AgreementItemProps = {
  text: string
  isChecked: boolean
  onToggle: VoidFunction
}

const AGREEMENTS = [
  { id: 'personalConsent', text: '(필수) 개인정보 이용 약관 동의' },
  { id: 'serviceConsent', text: '(필수) 서비스 이용 약관 동의' },
] as const

type AgreementId = (typeof AGREEMENTS)[number]['id']

const AgreementItem = ({ text, isChecked, onToggle }: AgreementItemProps) => {
  const textStyle = isChecked ? 'text-blue-500 font-bold' : 'text-grey-500 font-medium'

  return (
    <div className="flex-align">
      <button type="button" className="flex-align gap-2" onClick={onToggle}>
        <CheckIcon active={isChecked} />
        <p className={`p-large ${textStyle}`}>{text}</p>
      </button>
      <button type="button" className="p-small ml-auto border-b border-b-grey-400 text-grey-400">
        보기
      </button>
    </div>
  )
}

export const SignupThirdStep = ({ label }: StepProps) => {
  const navigate = useNavigate()
  const totalStep = useTotalStep()

  const { reset } = useFormContext()
  const { goPreviousStep } = useStepsActions()

  const [checkedAgreements, setCheckedAgreements] = useState<Set<AgreementId>>(new Set())
  const isAllChecked = checkedAgreements.size === AGREEMENTS.length

  const toggleAgreement = (id: AgreementId) => {
    setCheckedAgreements((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAllAgreements = () => {
    setCheckedAgreements((prev) =>
      prev.size === AGREEMENTS.length ? new Set() : new Set(AGREEMENTS.map((a) => a.id)),
    )
  }

  const handleClose = () => {
    navigate('/login')
    reset()
  }

  return (
    <>
      <SubHeaderWithIcon type="close" onClickCancel={goPreviousStep} onClickClose={handleClose} />
      <LabelWithStep currentStep={3} totalStep={totalStep} label={label} />

      <div className="flex-column scroll mx-4 mb-2 mt-[65px] grow gap-7">
        <button type="button" onClick={toggleAllAgreements} className="flex-align gap-2">
          <AllCheckIcon active={isAllChecked} />
          <h4 className={`font-bold ${isAllChecked ? 'text-blue-500' : 'text-grey-500'}`}>
            모두 동의합니다.
          </h4>
        </button>

        <div className="flex-column gap-6">
          {AGREEMENTS.map(({ id, text }) => (
            <AgreementItem
              key={id}
              text={text}
              isChecked={checkedAgreements.has(id)}
              onToggle={() => toggleAgreement(id)}
            />
          ))}
        </div>
      </div>

      <Button size="lg" type="submit" disabled={!isAllChecked} className="mx-4 mb-10 mt-2">
        회원가입 완료
      </Button>
    </>
  )
}
