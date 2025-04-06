import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { usePostAuthorCheck } from '../model/usePostAuthorCheck'

import { AuthenticatedHeader } from './AuthenticatedHeader'

export const PostDetailHeader = () => {
  const { isLoggedIn, isMyPost } = usePostAuthorCheck()

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return <AuthenticatedHeader />
}
