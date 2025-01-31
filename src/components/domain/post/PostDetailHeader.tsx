import { useNavigate } from 'react-router-dom'

import { Kebab } from '@/components/view/Kebab'
import { ModalWithTwoButton } from '@/components/view/Modal'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useParamId } from '@/hooks/useParamId'
import { useDeletePost, useMarkPostAsFull } from '@/services/query/usePostQuery'
import { useCurrentTab, useIsMyPost, usePost } from '@/stores/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const usePostDetailActions = () => {
  const post = usePost()
  const boardId = useParamId()
  const currentTab = useCurrentTab()
  const navigate = useNavigate()

  const { mutate: markAsFull } = useMarkPostAsFull()
  const { mutate: deletePost } = useDeletePost()

  const handleEdit = () => navigate(`/${currentTab}/edit/${boardId}`)

  const handleCheckFull = () => {
    markAsFull({ body: { full: !post?.full }, urls: { boardId } })
  }

  const handleDelete = () => {
    deletePost(
      { urls: { boardId } },
      { onSuccess: () => navigate(`/${currentTab}`, { replace: true }) },
    )
  }

  return { handleEdit, handleCheckFull, handleDelete }
}

export const PostDetailHeader = () => {
  const post = usePost()
  const isMyPost = useIsMyPost()
  const { handleEdit, handleCheckFull, handleDelete } = usePostDetailActions()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const isLoggedIn = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  const kebabMap = [
    { label: '수정하기', onClick: handleEdit },
    { label: post?.full ? '모집 중으로 변경' : '모집 완료로 변경', onClick: handleCheckFull },
    { label: '삭제하기', onClick: openModal, isRed: true },
  ]

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      {isKebabOpen && <Kebab items={kebabMap} position={[48, 16]} />}
      <ModalWithTwoButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content="게시글을 삭제하시겠습니까?"
        secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
        primaryButton={{ onClick: handleDelete, label: '삭제' }}
      />
    </>
  )
}
