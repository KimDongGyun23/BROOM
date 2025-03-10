import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

import { useCreatePost } from '../hook/useCreatePost'

export const PostCreateHeader = () => {
  const { onSubmit } = useCreatePost()

  return <SubHeaderWithoutIcon type="complete" title="승차 공유 등록" onClickComplete={onSubmit} />
}
