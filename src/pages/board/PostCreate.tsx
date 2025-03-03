import { FormProvider } from 'react-hook-form'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { PostCreateForm } from '@/features/create-post/ui/PostCreateForm'
import { PostCreateHeader } from '@/features/create-post/ui/PostCreateHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const PostCreate = () => {
  const formMethod = useCustomForm<PostForm>(postSchema)

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <FlexColumnContainer>
          <PostCreateHeader />
          <PostCreateForm />
        </FlexColumnContainer>
      </FormProvider>

      <ModalWithOneButton />
    </ModalStoreProvider>
  )
}
