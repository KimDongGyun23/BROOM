type CanJoinChatRoomType = (currentParticipants: number, maxParticipants: number) => boolean

export const canJoinChatRoom: CanJoinChatRoomType = (currentParticipants, maxParticipants) => {
  if (typeof currentParticipants !== 'number' || typeof maxParticipants !== 'number') {
    throw new Error('입력 값은 숫자여야 합니다.')
  }

  return currentParticipants < maxParticipants
}
