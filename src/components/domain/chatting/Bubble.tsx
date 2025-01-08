type BubbleProps = {
  isMyMessage: boolean
  message: string
}

export const Bubble = ({ isMyMessage, message }: BubbleProps) => {
  const bubbleStyle = isMyMessage
    ? 'rounded-[20px] rounded-tr-none bg-blue-400 text-grey-100'
    : 'rounded-[20px] rounded-tl-none bg-grey-200 text-grey-700'
  return <div className={`px-4 py-[10px] ${bubbleStyle}`}>{message}</div>
}
