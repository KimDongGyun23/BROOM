import { useIsLoggedIn, useUserData } from '@/entities/auth/model/auth.store'
import { usePostDetailContent } from '@/features/post-detail/model/postDetail.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { AuthenticatedHeader } from './AuthenticatedHeader'

export const PostDetailHeader = () => {
  const isLoggedIn = useIsLoggedIn()
  const user = useUserData()
  const post = usePostDetailContent()

  const isMyPost = user?.nickname === post?.author.nickname

  if (!isLoggedIn || !isMyPost) return <SubHeaderWithoutIcon type="null" />

  return <AuthenticatedHeader />
}
