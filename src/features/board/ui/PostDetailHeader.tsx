import { useNavigate } from 'react-router-dom'

import { useIsMyPost } from '@/features/board/model/postDetail.store'
import { PostDeleteModal } from '@/features/board/ui/PostDeleteModal'
import { instance } from '@/query'
import { useBoolean } from '@/shared/hook/useBoolean'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalStoreProvider, useModalActions } from '@/shared/model/modal'
import { Kebab } from '@/shared/ui/Kebab'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const { openTwoButtonModal } = useModalActions()

  const kebabMap = [
    { label: '수정하기', onClick: () => navigate(`/carpool/edit/${boardId}`) },
    {
      label: '삭제하기',
      onClick: () => openTwoButtonModal('게시글을 삭제하시겠습니까?'),
      isRed: true,
    },
  ]

  return (
    <ModalStoreProvider>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab isOpen={isKebabOpen} items={kebabMap} position={[48, 16]} />

      <PostDeleteModal />
    </ModalStoreProvider>
  )
}

export const PostDetailHeader = () => {
  const session = instance.hasToken()
  const isMyPost = useIsMyPost()

  if (!session || !isMyPost) return <SubHeaderWithoutIcon type="null" />
  return <AuthenticatedHeader />
}
