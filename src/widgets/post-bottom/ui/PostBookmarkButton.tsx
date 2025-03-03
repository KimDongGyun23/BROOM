import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const PostBookmarkButton = () => {
  return (
    <ModalStoreProvider>
      <PostBookmarkButton />
      <ModalWithOneButton />
    </ModalStoreProvider>
  )
}
