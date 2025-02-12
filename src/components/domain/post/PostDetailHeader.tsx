import { useNavigate } from 'react-router-dom'

import { Kebab } from '@/components/view/Kebab'
import { ModalWithOneButton, ModalWithTwoButton } from '@/components/view/Modal'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useParamId } from '@/hooks/useParamId'
import { instance } from '@/services/query'
import { useDeletePost, useMarkPostAsFull } from '@/services/query/usePostQuery'
import { useIsMyPost, usePost } from '@/stores/post'
import { usePostModal, usePostModalActions, usePostModalText } from '@/stores/postModal'

const usePostDetailActions = () => {
  const post = usePost()
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: markAsFull } = useMarkPostAsFull()
  const { mutate: deletePost } = useDeletePost()
  const { setFeedbackMessage, openModal, closeModal } = usePostModalActions()

  const handleEdit = () => navigate(`/carpool/edit/${boardId}`)

  const handleCheckFull = () => {
    markAsFull(
      { body: { full: !post?.status.full }, urls: { boardId } },
      {
        onSuccess: () => {
          setFeedbackMessage('모집 상태가 변경되었습니다.')
          openModal('secondary')
        },
        onError: () => {
          setFeedbackMessage('모집 상태 변경에 실패했습니다.')
          openModal('secondary')
        },
      },
    )
  }

  const handleDelete = () => {
    deletePost(
      { urls: { boardId } },
      {
        onSuccess: () => {
          navigate(`/carpool`, { replace: true })
          closeModal()
        },
        onError: () => {
          setFeedbackMessage('게시글을 삭제하지 못했습니다.')
          openModal('secondary')
        },
      },
    )
  }

  return { handleEdit, handleCheckFull, handleDelete }
}

export const PostDetailHeader = () => {
  const post = usePost()
  const isMyPost = useIsMyPost()
  const modalText = usePostModalText()
  const isModalOpen = usePostModal()

  const { handleEdit, handleCheckFull, handleDelete } = usePostDetailActions()
  const { openModal, closeModal } = usePostModalActions()

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)

  const isLoggedIn = instance.hasToken()

  const kebabMap = [
    { label: '수정하기', onClick: handleEdit },
    {
      label: post?.status.full ? '모집 중으로 변경' : '모집 완료로 변경',
      onClick: handleCheckFull,
    },
    { label: '삭제하기', onClick: () => openModal('primary'), isRed: true },
  ]

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      {isKebabOpen && <Kebab items={kebabMap} position={[48, 16]} />}

      <ModalWithTwoButton
        isOpen={isModalOpen.primary}
        onClose={closeModal}
        content="게시글을 삭제하시겠습니까?"
        secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
        primaryButton={{ onClick: handleDelete, label: '삭제' }}
      />

      <ModalWithOneButton
        isOpen={isModalOpen.secondary}
        onClose={closeModal}
        content={modalText}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}
