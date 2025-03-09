import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useCreatePost } from '../hook/useCreatePost'

export const PostCreateHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { onSubmit } = useCreatePost(openModal)

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="승차 공유 등록" onClickComplete={onSubmit} />
      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}
