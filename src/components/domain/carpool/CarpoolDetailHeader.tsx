import { useNavigate } from 'react-router-dom'

import { PostDetailHeader } from '@/components/view/post/PostDetailHeader'
import { useParamId } from '@/hooks/useParamId'
import { useMarkCarpoolAsFull } from '@/services/query/useCarpoolQuery'
import { useDeletePost } from '@/services/query/usePostQuery'
import { usePost } from '@/stores/post'

export const CarpoolDetailHeader = () => {
  const post = usePost()
  const boardId = useParamId()
  const navigate = useNavigate()
  const { mutate: checkFullMutation } = useMarkCarpoolAsFull()
  const { mutate: deleteMutation } = useDeletePost()

  const handleEdit = () => navigate(`/carpool/edit/${boardId}`)

  const handleCheckFull = () => {
    checkFullMutation({ body: { full: !post?.full }, urls: { boardId } })
  }

  const handleDelete = () => {
    deleteMutation(
      { urls: { boardId } },
      { onSuccess: () => navigate('/carpool', { replace: true }) },
    )
  }

  return (
    <PostDetailHeader onCheckFull={handleCheckFull} onDelete={handleDelete} onEdit={handleEdit} />
  )
}
