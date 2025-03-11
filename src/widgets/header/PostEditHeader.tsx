import { useFormContext } from 'react-hook-form'

import type { PostForm } from '@/entities/board/model/post.type'
import { useEditPost } from '@/features/edit-post/hook/useEditPost'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { EditPostSuccessModal } from './modal/EditPostSuccessModal'

export const PostEditHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { handleSubmit } = useFormContext<PostForm>()

  const { handleEditPost } = useEditPost(openModal)

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 수정"
        onClickComplete={handleSubmit(handleEditPost)}
      />

      <EditPostSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
