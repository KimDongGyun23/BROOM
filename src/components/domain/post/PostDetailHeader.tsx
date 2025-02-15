import { useNavigate } from 'react-router-dom'

import { Kebab } from '@/components/view/Kebab'
import { ModalWithOneButton, ModalWithTwoButton } from '@/components/view/Modal'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useParamId } from '@/hooks/useParamId'
import { instance } from '@/query'
import { useDeletePost } from '@/query/useCarpoolQuery'
import {
  useIsSuccessModal,
  useModalActions,
  useModalState,
  useTwoButtonModalState,
} from '@/stores/modal'
import { useIsMyPost } from '@/stores/post'

const useHandlePostDelete = () => {
  const boardId = useParamId()

  const { mutate: deletePost } = useDeletePost()
  const { openModal } = useModalActions()

  const handleDelete = () => {
    deletePost(
      { urls: { boardId } },
      {
        onSuccess: (response) => openModal(response.data, true),
        onError: (error) => openModal(error.response?.data as string, false),
      },
    )
  }

  return { handleDelete }
}

const PostDetailModal = () => {
  const navigate = useNavigate()
  const { handleDelete } = useHandlePostDelete()

  const isSuccessModal = useIsSuccessModal()
  const { isModalOpen, label } = useModalState()
  const { isTwoButtonModalOpen, twoButtonLabel } = useTwoButtonModalState()
  const { closeModal } = useModalActions()

  const handlePostDeleteSuccess = () => {
    navigate(`/carpool`, { replace: true })
    closeModal()
  }

  const handlePostDeleteError = () => closeModal()

  return (
    <>
      <ModalWithTwoButton
        isOpen={isTwoButtonModalOpen}
        onClose={closeModal}
        content={twoButtonLabel}
        secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
        primaryButton={{ onClick: handleDelete, label: '삭제' }}
      />

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={label}
        button={{
          onClick: isSuccessModal ? handlePostDeleteSuccess : handlePostDeleteError,
          label: '확인',
        }}
      />
    </>
  )
}

export const PostDetailHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()
  const session = instance.hasToken()
  const isMyPost = useIsMyPost()

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

  if (!session || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab isOpen={isKebabOpen} items={kebabMap} position={[48, 16]} />
      <PostDetailModal />
    </>
  )
}
