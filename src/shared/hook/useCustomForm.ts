import type { FieldValues, UseFormProps } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema } from 'zod'

export const useCustomForm = <T extends FieldValues>(
  schema: ZodSchema,
  options: Omit<UseFormProps<T>, 'resolver'> = {},
) => {
  const formMethod = useForm<T>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    ...options,
  })

  return formMethod
}
