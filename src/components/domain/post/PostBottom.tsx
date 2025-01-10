import { Button } from '@/components/view/Button'
import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useToggle } from '@/hooks/useToggle'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type PostBottomProps = {
  isMyPost?: boolean
  disabled?: boolean
  initialIsBookmarked?: boolean
  onBookmark: VoidFunction
  onChatStart: VoidFunction
}

export const PostBottom = ({
  isMyPost = false,
  disabled = false,
  initialIsBookmarked = false,
  onBookmark,
  onChatStart,
}: PostBottomProps) => {
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)
  const [isBookmarked, setIsBookmarked] = useToggle(initialIsBookmarked)

  const handleClickBookmark = () => {
    onBookmark()
    setIsBookmarked()
  }

  if (!session) return null
  return (
    <div className="flex-align w-full gap-6 px-4 pb-[27px] pt-[9px] shadow-md">
      <button
        type="button"
        className="flex-column-align shrink-0 gap-1"
        onClick={handleClickBookmark}
      >
        <BookmarkIcon active={isBookmarked} />
        <p className="p-900 text-black-400">북마크</p>
      </button>
      <Button
        className="grow"
        secondary={isMyPost}
        size="sm"
        onClick={isMyPost ? undefined : onChatStart}
        disabled={disabled}
      >
        {disabled ? '모집 마감' : '채팅하기'}
      </Button>
    </div>
  )
}
