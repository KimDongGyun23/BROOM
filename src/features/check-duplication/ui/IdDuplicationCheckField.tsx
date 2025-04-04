import { styled } from 'styled-components'

import type { ValidateIdRequest } from '@/entities/auth/model/auth.type'
import type { FieldType } from '@/shared/model/common.type'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useIdDuplicationCheckMutation } from '../api/useDuplication.mutation'
import { useDuplicationCheck } from '../hook/useDuplicationCheck'
import {
  useIdDuplicationCheckActions,
  useIdDuplicationResultMessage,
  useIdUniqueState,
} from '../model/duplication.store'

export const IdDuplicationCheckField = ({ section, label, input }: FieldType) => {
  const isUnique = useIdUniqueState()
  const message = useIdDuplicationResultMessage()

  const { mutate } = useIdDuplicationCheckMutation()
  const { setDuplicationCheckState } = useIdDuplicationCheckActions()

  const checkHandler = useDuplicationCheck<'userId', ValidateIdRequest>({
    mutate,
    sectionKey: 'userId',
    setState: setDuplicationCheckState,
    errorMessage: message || '아이디 중복 검사에 실패했습니다.',
  })

  return (
    <InputGroup section={section}>
      <InputGroup.Label
        label={label}
        successMessage={isUnique ? '사용 가능한 아이디입니다' : null}
        errorMessage={isUnique === false ? '이미 사용 중인 아이디입니다' : null}
      />
      <ValidateContainer>
        <InputGroup.Input {...input} />
        <Button size="md" onClick={checkHandler}>
          아이디 중복 확인
        </Button>
      </ValidateContainer>
    </InputGroup>
  )
}

const ValidateContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'lg')};
`
