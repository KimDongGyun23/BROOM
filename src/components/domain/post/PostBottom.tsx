import { Button } from '@/components/view/Button'
import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useToggle } from '@/hooks'

type PostBottomProps = {
  isMyPost?: boolean
  disabled?: boolean
  initialBookmarkState?: boolean
  onClickBookmark: VoidFunction
  onClickChattingButton: VoidFunction
}

export const PostBottom = ({
  isMyPost = false,
  disabled = false,
  initialBookmarkState = false,
  onClickBookmark,
  onClickChattingButton,
}: PostBottomProps) => {
  const [isBookmarked, setIsBookmarked] = useToggle(initialBookmarkState)

  const handleClickBookmark = () => {
    onClickBookmark()
    setIsBookmarked()
  }

  return (
    <div className="flex-align w-full gap-6 px-4 pb-[27px] pt-[9px] shadow-md">
      <button
        type="button"
        className="flex-column-align shrink-0 gap-1"
        onClick={handleClickBookmark}
      >
        <BookmarkIcon active={isBookmarked} />
        <p className="p-xsmall text-grey-500">북마크</p>
      </button>
      <Button
        className="grow"
        secondary={isMyPost}
        size="sm"
        onClick={isMyPost ? undefined : onClickChattingButton}
        disabled={disabled}
      >
        {disabled ? '모집 마감' : '채팅하기'}
      </Button>
    </div>
  )
}