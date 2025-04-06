import { useNavigate } from 'react-router-dom'

import { DeleteConfirmationModal } from '@/features/delete-post/ui/DeleteConfirmationModal'
import { DeletePostSuccessModal } from '@/features/delete-post/ui/DeletePostSuccessModal'
import { useBoolean } from '@/shared/hook/useBoolean'
import useModal from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Kebab } from '@/shared/ui/Kebab'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

export const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)

  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <SubHeaderWithIcon type="kebab" onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab
        isOpen={isKebabOpen}
        items={[
          {
            label: '수정하기',
            onClick: () => navigate(`/board/edit/${boardId}`),
          },
          {
            label: '삭제하기',
            onClick: () => openModal(MODAL_KEYS.confirm, '게시글을 삭제하시겠습니까?'),
            isRed: true,
          },
        ]}
        position={[48, 16]}
      />

      <DeleteConfirmationModal
        label={modalLabel(MODAL_KEYS.confirm)}
        isModalOpen={isModalOpen(MODAL_KEYS.confirm)}
        closeModal={closeModal}
        openModal={openModal}
      />

      <DeletePostSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
      />
    </>
  )
}
