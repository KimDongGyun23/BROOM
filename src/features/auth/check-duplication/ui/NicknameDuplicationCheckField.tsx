import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

import type { ValidateNicknameRequest } from '@/entities/auth/model/auth.type'
import { useUserData } from '@/entities/auth/model/auth.store'
import type { FieldType } from '@/shared/model/common.type'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useNicknameDuplicationCheckMutation } from '../api/useDuplication.mutation'
import {
  useNicknameDuplicationCheckActions,
  useNicknameDuplicationResultMessage,
  useNicknameUniqueState,
} from '../model/duplication.store'
import { useDuplicationCheck } from '../model/useDuplicationCheck'

export const NicknameDuplicationCheckField = ({ section, label, input }: FieldType) => {
  const user = useUserData()
  const isUnique = useNicknameUniqueState()
  const message = useNicknameDuplicationResultMessage()

  const { getValues } = useFormContext()
  const { mutate } = useNicknameDuplicationCheckMutation()
  const { setDuplicationCheckState } = useNicknameDuplicationCheckActions()

  const checkHandler = useDuplicationCheck<'nickname', ValidateNicknameRequest>({
    mutate,
    sectionKey: 'nickname',
    setState: setDuplicationCheckState,
    errorMessage: message || '닉네임 중복 검사에 실패했습니다.',
  })

  const handleCheckDuplication = () => {
    const currentNickname = getValues(section)

    if (user && user.nickname === currentNickname) {
      setDuplicationCheckState(true, '기존 닉네임과 동일합니다.')
      return
    }

    checkHandler()
  }

  return (
    <InputGroup section={section}>
      <InputGroup.Label
        label={label}
        successMessage={isUnique ? '사용 가능한 닉네임입니다' : null}
        errorMessage={isUnique === false ? '이미 사용 중인 닉네임입니다' : null}
      />
      <ValidateContainer>
        <InputGroup.Input {...input} />
        <Button size="md" onClick={handleCheckDuplication}>
          중복 확인
        </Button>
      </ValidateContainer>
    </InputGroup>
  )
}

const ValidateContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`
