import { ModalWithTwoButton, SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view'
import { useBoolean } from '@/hooks'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

import { Kebab } from '../Kebab'

type PostDetailHeaderProps = {
  isMyPost: boolean
  isFull: boolean
  onCheckFull: VoidFunction
  onDelete: VoidFunction
  onEdit: VoidFunction
}

const LoggedInHeader = ({
  isMyPost,
  isFull,
  onCheckFull,
  onDelete,
  onEdit,
}: PostDetailHeaderProps) => {
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

      {isKebabOpen && <Kebab items={isMyPost ? myKebabMap : kebabMap} position="right-4 top-12" />}

      <ModalWithTwoButton
        isOpen={isModalOpen}
        closeModal={closeModal}
        content="게시글을 삭제하시겠습니까?"
        cancleButtonLabel="취소"
        completeButtonLabel="삭제"
        cancleOnClick={closeModal}
        completeOnClick={onDelete}
      />
    </>
  )
}

const LoggedOutHeader = () => <SubHeaderWithoutIcon type="null" />

export const PostDetailHeader = (props: PostDetailHeaderProps) => {
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  return loginSession ? <LoggedInHeader {...props} /> : <LoggedOutHeader />
}
