import { useFormContext } from 'react-hook-form'

type LabelProps = {
  section: string
  label: string
  successMessage?: string | null
  errorMessage?: string | null
}

export const Label = ({ section, successMessage, errorMessage, label }: LabelProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const currentErrorMessage = errors[section]?.message?.toString()

  return (
    <div className="flex-align gap-3">
      <p className="p-large font-medium text-grey-700">{label}</p>
      {currentErrorMessage ? (
        <p className="p-xsmall text-red-200">* {currentErrorMessage}</p>
      ) : (
        <>
          {successMessage && <p className="p-xsmall text-green">* {successMessage}</p>}
          {errorMessage && <p className="p-xsmall text-red-200">* {errorMessage}</p>}
        </>
      )}
    </div>
  )
}
