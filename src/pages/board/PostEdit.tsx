import { FormProvider } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { postSchema } from '@/entities/board/config/post.schema'
import type { PostForm } from '@/entities/board/model/post.type'
import { useFetchPostEditData } from '@/features/board/api/useBoard.query'
import { PostEditHeader } from '@/features/edit-post/ui/PostEditHeader'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { Loading } from '@/shared/ui/Loading'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { PostFormSection } from '@/widgets/post-form/ui/PostFormSection'

import { ErrorPage } from '../home/ErrorPage'

export const PostEdit = () => {
  const boardId = useParamId()

  const { data: defaultValues, isPending, isError } = useFetchPostEditData({ urls: { boardId } })
  const formMethod = useCustomForm<PostForm>(postSchema, { defaultValues })

  if (isPending) return <Loading />
  if (isError || !defaultValues) return <ErrorPage />

  return (
    <ModalStoreProvider>
      <FormProvider {...formMethod}>
        <Container>
          <PostEditHeader />
          <PostFormSection />
        </Container>
      </FormProvider>

      <ModalWithOneButton />
    </ModalStoreProvider>
  )
}
