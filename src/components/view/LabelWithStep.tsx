import type { PropsWithChildren } from 'react'

type LabelWithStepProps = {
  currentStep: number
  totalStep: number
}

export const LabelWithStep = ({
  currentStep,
  totalStep,
  children,
}: PropsWithChildren<LabelWithStepProps>) => {
  return (
    <div className="flex-between mx-4 mt-6 items-end">
      <h4 className="font-bold text-grey-700">{children}</h4>
      <p className="p-small font-medium text-blue-400">
        {currentStep} / {totalStep}
      </p>
    </div>
  )
}
