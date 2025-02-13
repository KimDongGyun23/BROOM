import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useBoolean } from '@/hooks/useBoolean'
import { useLogout } from '@/query/useMypageQuery'
import { clearSessionStorage } from '@/utils/storage'

export const LogoutButton = () => {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        clearSessionStorage()
        navigate('/home')
      },
      onError: openModal,
    })
  }

  return (
    <>
      <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content={`로그아웃에 실패했습니다.`}
        button={{ onClick: closeModal, label: '확인' }}
      />
    </>
  )
}

const ActionButton = styled.button`
  ${({ theme }) => theme.padding(0, 'lg')};
  ${({ theme }) => theme.border('underline', 'right')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`
