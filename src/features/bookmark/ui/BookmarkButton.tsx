import { styled } from 'styled-components'

import { useBookmark } from '@/features/bookmark/model/useBookmark'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { BookmarkIcon } from '@/shared/ui/icons/ActiveIcons'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const BookmarkButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { isBookmarked, toggleBookmark } = useBookmark(openModal)

  return (
    <>
      <BookmarkStyledButton type="button" onClick={toggleBookmark}>
        <BookmarkIcon active={isBookmarked} />
        <p className="label">북마크</p>
      </BookmarkStyledButton>

      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}

const BookmarkStyledButton = styled.button`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'xs')}
  flex-shrink: 0;

  .label {
    ${({ theme }) => theme.font(900, theme.colors.black[400])};
  }
`
