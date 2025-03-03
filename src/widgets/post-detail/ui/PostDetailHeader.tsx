import { useNavigate } from 'react-router-dom'

import { useIsMyPost } from '@/entities/board/model/postDetail.store'
import { DeleteConfirmationModal } from '@/features/delete-post/ui/DeleteConfirmationModal'
import { DeleteResultModal } from '@/features/delete-post/ui/DeleteResultModal'
import { useBoolean } from '@/shared/hook/useBoolean'
import { useParamId } from '@/shared/hook/useParamId'
import { useIsLoggedIn } from '@/shared/model/auth.store'
import { ModalStoreProvider, useModalActions } from '@/shared/model/modal.store'
import { Kebab } from '@/shared/ui/Kebab'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const { openTwoButtonModal } = useModalActions()

  const kebabMap = [
    { label: '수정하기', onClick: () => navigate(`/board/edit/${boardId}`) },
    {
      label: '삭제하기',
      onClick: () => openTwoButtonModal('게시글을 삭제하시겠습니까?'),
      isRed: true,
    },
  ]

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab isOpen={isKebabOpen} items={kebabMap} position={[48, 16]} />
      <DeleteConfirmationModal />
      <DeleteResultModal />
    </>
  )
}

export const PostDetailHeader = () => {
  const isLoggedIn = useIsLoggedIn()
  const isMyPost = useIsMyPost()

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return (
    <ModalStoreProvider>
      <AuthenticatedHeader />
    </ModalStoreProvider>
  )
}
