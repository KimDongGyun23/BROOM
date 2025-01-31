import { useNavigate } from 'react-router-dom'

import { PostDetailHeader } from '@/components/view/post/PostDetailHeader'
import { useParamId } from '@/hooks/useParamId'
import { useDeletePost, useMarkPostAsFull } from '@/services/query/usePostQuery'
import { usePost } from '@/stores/post'

export const CarpoolDetailHeader = () => {
  const post = usePost()
  const boardId = useParamId()
  const navigate = useNavigate()
  const { mutate: markAsFull } = useMarkPostAsFull()
  const { mutate: deletePost } = useDeletePost()

  const handleEdit = () => navigate(`/carpool/edit/${boardId}`)

  const handleCheckFull = () => {
    markAsFull({ body: { full: !post?.full }, urls: { boardId } })
  }

  const handleDelete = () => {
    deletePost({ urls: { boardId } }, { onSuccess: () => navigate('/carpool', { replace: true }) })
  }

  return (
    <PostDetailHeader onCheckFull={handleCheckFull} onDelete={handleDelete} onEdit={handleEdit} />
  )
}
