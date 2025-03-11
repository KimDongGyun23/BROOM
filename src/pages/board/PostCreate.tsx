import { FormProvider } from 'react-hook-form'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { PostCreateHeader } from '@/features/create-post/ui/PostCreateHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { PostFormSection } from '@/widgets/post-form/PostFormSection'

export const PostCreate = () => {
  const formMethod = useCustomForm<PostForm>(postSchema)

  return (
    <FormProvider {...formMethod}>
      <FlexColumnContainer>
        <PostCreateHeader />
        <PostFormSection />
      </FlexColumnContainer>
    </FormProvider>
  )
}
