import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Bubble } from '@/components/domain/chatting/Bubble'
import { SubHeaderWithIcon } from '@/components/view/header/SubHeader'
import { AdditionIcon, SendingIcon } from '@/components/view/icons/NonActiveIcons'
import { Kebab } from '@/components/view/Kebab'
import { Loading } from '@/components/view/Loading'
import { ChattingRoomProfile } from '@/components/view/Profile'
import { ProfileImage } from '@/components/view/ProfileImage'
import { useBoolean, useScrollToBottom, useWebSocket } from '@/hooks'
import { useCarpoolChattingInfo, useCarpoolExitChattingRoom } from '@/services/query'
import { useMessageActions, useMessageData } from '@/stores/message'
import type { MilitaryBranchCode } from '@/utils/constants'

type ChattingKebabProps = {
  isKebabOpen: boolean
}

type MessageListProps = {
  opponent: string
  iconType: MilitaryBranchCode
}

const ChattingKebab = ({ isKebabOpen }: ChattingKebabProps) => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const { mutate: exitRoom } = useCarpoolExitChattingRoom()

  const kebabMap = [
    {
      label: '채팅방 나가기',
      onClick: () => {
        exitRoom({ urls: { chatRoomId: roomId as string } })
        navigate('/chatting')
      },
    },
    { label: '차단하기', onClick: () => console.log('차단하기'), isRed: true },
  ]

  if (isKebabOpen) return <Kebab items={kebabMap} position="right-4 top-12" />
  return null
}

const MessageBox = () => {
  const { id: roomId } = useParams()
  const formMethod = useForm<{ message: string }>({ defaultValues: { message: '' } })
  const { register, handleSubmit, reset } = formMethod
  const { client, sendMessage } = useWebSocket(roomId, 'carpool')

  const handleSendMessage = ({ message }: { message: string }) => {
    if (message.length !== 0) {
      if (client.current && client.current.connected) {
        sendMessage(message)
        reset()
      } else {
        console.log('WebSocket is not connected')
      }
    }
  }

  return (
    <FormProvider {...formMethod}>
      <form
        className="flex-align gap-2 bg-white px-4 pb-8 pt-3"
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <div className="shrink-0">
          <AdditionIcon />
        </div>
        <div className="flex-align grow gap-1 rounded-full bg-grey-100 py-2 pl-4 pr-2">
          <input
            type="text"
            size={8}
            {...register}
            placeholder="메세지를 입력해주세요."
            className="grow bg-transparent text-grey-700 placeholder:text-grey-400 focus:outline-none"
          />

          <button type="submit" className="shrink-0">
            <SendingIcon />
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

const MessageList = ({ opponent, iconType }: MessageListProps) => {
  const messageList = useMessageData()
  const ref = useScrollToBottom(messageList)

  return (
    <main className="scroll flex-column mx-4 grow gap-4 py-4" ref={ref}>
      {messageList?.map(({ senderName, content, createdAt }, index) => {
        const isMyMessage = senderName !== opponent
        const layoutStyle = isMyMessage ? 'flex flex-row-reverse items-center' : 'flex-align'
        return (
          <div key={index} className={`${layoutStyle} gap-3`}>
            {!isMyMessage && <ProfileImage size="sm" iconType={iconType} />}
            <Bubble isMyMessage={isMyMessage} message={content} />
            <span className="p-xsmall shrink-0 self-end text-grey-500">{createdAt}</span>
          </div>
        )
      })}
    </main>
  )
}

export const CarpoolChattingRoom = () => {
  const { id: roomId } = useParams()
  const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  const { initialMessage } = useMessageActions()

  const {
    data: carpoolRoomData,
    isPending,
    isError,
  } = useCarpoolChattingInfo({
    urls: { chatRoomId: roomId as string },
  })

  useEffect(() => {
    if (carpoolRoomData) initialMessage(carpoolRoomData.previousMessages)
  }, [carpoolRoomData])

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <div className="flex-column h-full">
      <SubHeaderWithIcon type={'kebab'} onClickKebab={isKebabOpen ? closeKebab : openKebab} />
      <ChattingRoomProfile
        opponent={carpoolRoomData.opponentNickname}
        iconType={carpoolRoomData.militaryChaplain}
        dischargeYear={carpoolRoomData.yearsSinceDischarge}
        title={carpoolRoomData.carpoolBoardTitle}
      />

      <ChattingKebab isKebabOpen={isKebabOpen} />
      <MessageList
        opponent={carpoolRoomData.opponentNickname}
        iconType={carpoolRoomData.militaryChaplain}
      />
      <MessageBox />
    </div>
  )
}
