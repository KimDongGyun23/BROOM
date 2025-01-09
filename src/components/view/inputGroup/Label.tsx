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
      <p className="p-600 text-black-600">{label}</p>
      {currentErrorMessage ? (
        <p className="p-900 text-error">* {currentErrorMessage}</p>
      ) : (
        <>
          {successMessage && <p className="p-900 text-success">* {successMessage}</p>}
          {errorMessage && <p className="p-900 text-error">* {errorMessage}</p>}
        </>
      )}
    </div>
  )
}
