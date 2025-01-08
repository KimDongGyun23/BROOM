import type { PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

type LabelProps = {
  section: string
  customSuccessMessage?: string | null
  customErrorMessage?: string | null
}

export const Label = ({
  section,
  customSuccessMessage,
  customErrorMessage,
  children,
}: PropsWithChildren<LabelProps>) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex-align gap-3">
      <p className="p-large font-medium text-grey-700">{children}</p>
      {errors && errors[section] && errors[section].message ? (
        <p className="p-xsmall text-red-200">* {errors[section].message.toString()}</p>
      ) : (
        <>
          {customSuccessMessage && <p className="p-xsmall text-green">* {customSuccessMessage}</p>}
          {customErrorMessage && <p className="p-xsmall text-red-200">* {customErrorMessage}</p>}
        </>
      )}
    </div>
  )
}
