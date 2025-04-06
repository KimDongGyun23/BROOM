type ReturnType = (
  currentNickname: string | undefined,
  newNickname: string,
  isUnique: boolean | null,
) => { isValid: boolean; error?: string }

export const validateNicknameUpdate: ReturnType = (currentNickname, newNickname, isUnique) => {
  if (currentNickname === newNickname) {
    return { isValid: true }
  }

  if (isUnique === null) {
    return { isValid: false, error: '닉네임 중복 검사를 진행해주세요.' }
  }

  return { isValid: isUnique, error: isUnique ? undefined : '중복된 닉네임입니다.' }
}
