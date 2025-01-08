type LabelWithStepProps = {
  currentStep: number
  totalStep: number
  label: string
}

export const LabelWithStep = ({ currentStep, totalStep, label }: LabelWithStepProps) => {
  return (
    <div className="flex-between mx-4 mt-6 items-end">
      <h4 className="font-bold text-grey-700">{label}</h4>
      <p
        className="p-small font-medium text-blue-400"
        aria-label={`총 ${totalStep} 단계 중 ${currentStep} 단계`}
      >
        {currentStep} / {totalStep}
      </p>
    </div>
  )
}
