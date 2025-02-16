import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useParamId } from '@/hooks/useParamId'
import { useEditCarpoolPost, useFetchCarpoolEditData } from '@/query/useCarpoolQuery'
import type { CarpoolForm } from '@/types/post'

import { postSchema } from './useCarpoolCreateForm'

export const useCarpoolEditForm = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { data: defaultValues, isPending, isError } = useFetchCarpoolEditData({ urls: { boardId } })
  const { mutate: postUpdate } = useEditCarpoolPost()

  const formMethod = useCustomForm<CarpoolForm>(postSchema, { defaultValues })
  const { handleSubmit } = formMethod

  const handleEditCarpoolPost = (formData: CarpoolForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      personnel: parseInt(personnel as string),
      ...rest,
    }

    postUpdate(
      { urls: { boardId }, body: submissionData },
      { onSuccess: () => navigate(-1 as To, { replace: true }) },
    )
  }

  return { formMethod, isPending, isError, onSubmit: handleSubmit(handleEditCarpoolPost) }
}
