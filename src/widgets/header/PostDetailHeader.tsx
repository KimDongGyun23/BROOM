import { useNavigate } from 'react-router-dom'

import { usePostDetail } from '@/entities/board/model/postDetail.store'
import { useIsLoggedIn, useUserData } from '@/features/login/model/auth.store'
import { useBoolean } from '@/shared/hook/useBoolean'
import useModal from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { Kebab } from '@/shared/ui/Kebab'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { DeleteConfirmationModal } from '@/widgets/header/DeleteConfirmationModal'

const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)

  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const kebabMap = [
    { label: '수정하기', onClick: () => navigate(`/board/edit/${boardId}`) },
    {
      label: '삭제하기',
      onClick: () => openModal(MODAL_KEYS.confirm, '게시글을 삭제하시겠습니까?'),
      isRed: true,
    },
  ]

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab isOpen={isKebabOpen} items={kebabMap} position={[48, 16]} />
      <DeleteConfirmationModal
        label={modalLabel(MODAL_KEYS.confirm)}
        isModalOpen={isModalOpen(MODAL_KEYS.confirm)}
        closeModal={closeModal}
      />
    </>
  )
}

export const PostDetailHeader = () => {
  const isLoggedIn = useIsLoggedIn()
  const user = useUserData()
  const post = usePostDetail()

  const isMyPost = user?.nickname === post?.author.nickname

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return <AuthenticatedHeader />
}
