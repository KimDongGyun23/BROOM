import { FormProvider } from 'react-hook-form'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostFormType } from '@/entities/board/model/post.type'
import { PostForm } from '@/entities/board/ui/PostForm'
import { PostCreateHeader } from '@/features/create-post/ui/PostCreateHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'

export const CreatePost = () => {
  const formMethod = useCustomForm<PostFormType>(postSchema)

  return (
    <FormProvider {...formMethod}>
      <FlexColumnContainer>
        <PostCreateHeader />
        <PostForm />
      </FlexColumnContainer>
    </FormProvider>
  )
}
