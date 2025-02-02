import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useBoolean } from '@/hooks/useBoolean'
import { useUserDeletion } from '@/services/query/useMypageQuery'
import { clearSessionStorage } from '@/utils/storage'

export const DeleteUserButton = () => {
  const navigate = useNavigate()
  const { mutate: deleteUser } = useUserDeletion()
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        clearSessionStorage()
        navigate('/home')
      },
      onError: openModal,
    })
  }

  return (
    <>
      <ActionButton onClick={handleDeleteUser}>회원탈퇴</ActionButton>
      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={`회원 탈퇴에 실패했습니다.`}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.font(800, theme.colors.error)};
`
