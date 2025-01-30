import { Kebab } from '@/components/view/Kebab'
import { ModalWithTwoButton } from '@/components/view/Modal'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useIsMyPost, usePost } from '@/stores/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type PostDetailHeaderProps = {
  onCheckFull: VoidFunction
  onDelete: VoidFunction
  onEdit: VoidFunction
}

const LoggedInHeader = ({ onCheckFull, onDelete, onEdit }: PostDetailHeaderProps) => {
  const post = usePost()
  const isMyPost = useIsMyPost()
  const isFull = post?.full

  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const myKebabMap = [
    { label: '수정하기', onClick: onEdit },
    { label: isFull ? '모집 중으로 변경' : '모집 완료로 변경', onClick: onCheckFull },
    { label: '삭제하기', onClick: openModal, isRed: true },
  ]

  const kebabMap = [{ label: '차단하기', onClick: () => console.log('차단하기'), isRed: true }]

  return (
    <>
      <SubHeaderWithIcon type="kebab" onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      {isKebabOpen && <Kebab items={isMyPost ? myKebabMap : kebabMap} position={[48, 16]} />}
      <ModalWithTwoButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content="게시글을 삭제하시겠습니까?"
        secondaryButton={{ onClick: closeModal, label: '취소', secondary: true }}
        primaryButton={{ onClick: onDelete, label: '삭제' }}
      />
    </>
  )
}

const LoggedOutHeader = () => <SubHeaderWithoutIcon type="null" />

export const PostDetailHeader = (props: PostDetailHeaderProps) => {
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  return session ? <LoggedInHeader {...props} /> : <LoggedOutHeader />
}
