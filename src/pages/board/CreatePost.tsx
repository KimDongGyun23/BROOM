import { FormProvider } from 'react-hook-form'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { PostCreateHeader } from '@/widgets/header/PostCreateHeader'
import { PostFormSection } from '@/widgets/section/PostFormSection'

export const CreatePost = () => {
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
