import { Link } from 'react-router-dom'

import { AdditionCircleIcon, StopIcon } from '@/components/view/icons/NonActiveIcons'
import type { PostItemType } from '@/types/post'

type PostItemProps = {
  item: PostItemType
  to: string
}

const PostItem = ({ item, to }: PostItemProps) => {
  const { title, createdAt, trainingDate, place, time, full } = item

  return (
    <Link className="flex-column block gap-[10px] border-b border-b-grey-200 px-3 py-6" to={to}>
      <div className="flex-between-align gap-3">
        <p className="p-600 truncate text-black-600">{title}</p>
        <p className="p-900 text-black-300">{createdAt}</p>
      </div>

      <div className="flex-between-align gap-3 text-left">
        <div className="flex-column grow gap-1 overflow-hidden">
          <p className="p-800 text-black-500">{trainingDate} 훈련</p>
          <div className="p-900 flex gap-2 text-black-400">
            <span className="truncate">{place}</span>
            <span>|</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="shrink-0">{full ? <StopIcon /> : <AdditionCircleIcon />}</div>
      </div>
    </Link>
  )
}

type PostListProps = {
  items: PostItemType[] | undefined
  to: string
}

export const PostList = ({ items, to }: PostListProps) => {
  if (!items) return null
  return (
    <section className="scroll grow px-4">
      {items.map((item) => (
        <PostItem key={item.id} item={item} to={`${to}/${item.id}`} />
      ))}
    </section>
  )
}
