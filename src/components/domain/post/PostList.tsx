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
    <Link
      className="flex-column mx-4 block gap-[10px] border-b border-b-grey-200 px-3 py-6"
      to={to}
    >
      <div className="flex-between-align gap-3">
        <p className="p-large truncate font-bold text-blue-500">{title}</p>
        <p className="p-xsmall text-grey-400">{createdAt}</p>
      </div>
      <div className="flex-between-align gap-3 text-left">
        <div className="flex-column gap-1">
          <p className="p-small font-bold text-grey-600">{trainingDate} 훈련</p>
          <div className="p-small text-grey-500">
            <span>{place}</span>
            <span className="mx-2">|</span>
            <span>{time}</span>
          </div>
        </div>
        {full ? <StopIcon /> : <AdditionCircleIcon />}
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
    <section className="scroll grow">
      {items.map((item) => (
        <PostItem key={item.id} item={item} to={`${to}/${item.id}`} />
      ))}
    </section>
  )
}
