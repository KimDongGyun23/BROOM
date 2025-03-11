import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { useFetchPostEditData } from '@/entities/board/api/useBoard.query'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useParamId } from '@/shared/hook/useParamId'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { PostFormSection } from '@/widgets/post-form/PostFormSection'
import { PostEditHeader } from '@/widgets/post-header/PostEditHeader'

export const PostEdit = () => {
  const boardId = useParamId()

  const { data: defaultValues } = useFetchPostEditData({ urls: { boardId } })

  const formMethod = useCustomForm<PostForm>(postSchema, { defaultValues })

  if (!defaultValues) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  return (
    <FormProvider {...formMethod}>
      <Container>
        <PostEditHeader />
        <PostFormSection />
      </Container>
    </FormProvider>
  )
}
