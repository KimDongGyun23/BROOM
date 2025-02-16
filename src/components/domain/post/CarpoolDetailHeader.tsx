import { useNavigate } from 'react-router-dom'

import { Kebab } from '@/components/view/Kebab'
import { SubHeaderWithIcon, SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useParamId } from '@/hooks/useParamId'
import { instance } from '@/query'
import { useModalActions } from '@/stores/modal'
import { useIsMyPost } from '@/stores/post'

const AuthenticatedHeader = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

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

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <Kebab isOpen={isKebabOpen} items={kebabMap} position={[48, 16]} />
    </>
  )
}

export const CarpoolDetailHeader = () => {
  const session = instance.hasToken()
  const isMyPost = useIsMyPost()

  if (!session || !isMyPost) return <SubHeaderWithoutIcon type="null" />
  return <AuthenticatedHeader />
}
