import { useIsLoggedIn, useUserData } from '@/entities/auth/model/auth.store'

import { usePostContent } from './postDetail.store'

export const usePostAuthorCheck = () => {
  const isLoggedIn = useIsLoggedIn()
  const user = useUserData()
  const post = usePostContent()

  const isMyPost = user?.nickname === post?.author.nickname

  return { isLoggedIn, isMyPost }
}
