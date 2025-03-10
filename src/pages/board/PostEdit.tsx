import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { useFetchPostEditData } from '@/entities/board/api/useBoard.query'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { PostEditHeader } from '@/features/edit-post/ui/PostEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useParamId } from '@/shared/hook/useParamId'
import { PostFormSection } from '@/widgets/post-form/ui/PostFormSection'

import { ErrorPage } from '../home/ErrorPage'

export const PostEdit = () => {
  const boardId = useParamId()

  const { data: defaultValues, isError } = useFetchPostEditData({ urls: { boardId } })
  const formMethod = useCustomForm<PostForm>(postSchema, { defaultValues })

  if (isError || !defaultValues) return <ErrorPage />

  return (
    <FormProvider {...formMethod}>
      <Container>
        <PostEditHeader />
        <PostFormSection />
      </Container>
    </FormProvider>
  )
}
