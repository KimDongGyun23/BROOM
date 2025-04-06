import { useNavigate } from 'react-router-dom'

import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useBoolean } from '@/shared/hook/useBoolean'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'
import { Kebab } from '@/shared/ui/Kebab'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

export const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { openModal } = useModalActions()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)

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
            onClick: () => openModal(MODAL_KEYS.DELETE_POST_CONFIRM, '게시글을 삭제하시겠습니까?'),
            isRed: true,
          },
        ]}
        position={[48, 16]}
      />
    </>
  )
}
