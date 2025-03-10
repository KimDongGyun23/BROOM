import { styled } from 'styled-components'

import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { BookmarkIcon } from '@/shared/ui/icons/ActiveIcons'

import { useBookmark } from '../hook/useBookmark'

import { BookmarkSuccessModal } from './BookmarkSuccessModal'

export const BookmarkButton = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const { isBookmarked, toggleBookmark } = useBookmark(openModal)

  return (
    <>
      <BookmarkStyledButton type="button" onClick={toggleBookmark}>
        <BookmarkIcon active={isBookmarked} />
        <p className="label">북마크</p>
      </BookmarkStyledButton>

      <BookmarkSuccessModal
        label={modalLabel(MODAL_KEYS.success)}
        isModalOpen={isModalOpen(MODAL_KEYS.success)}
        closeModal={closeModal}
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
