import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { useFetchPostEditData } from '@/entities/board/api/useBoard.query'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostFormType } from '@/entities/board/model/post.type'
import { PostForm } from '@/entities/board/ui/PostForm'
import { PostEditHeader } from '@/features/edit-post/ui/PostEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useParamId } from '@/shared/hook/useParamId'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'

export const EditPost = () => {
  const boardId = useParamId()

  const { data: defaultValues } = useFetchPostEditData({ urls: { boardId } })

  const formMethod = useCustomForm<PostFormType>(postSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <Container>
        <PostEditHeader />
        <PostForm />
      </Container>
    </FormProvider>
  )
}
