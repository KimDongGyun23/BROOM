import { ValidateContainer } from '@/app/style/commonStyles'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useNicknameDuplicationCheck } from '../hook/useNicknameDuplicationCheck'
import type { FieldType } from '../model/field.type'
import {
  useNicknameDuplicationResultMessage,
  useNicknameUniqueState,
} from '../model/nicknameDuplicationCheck.store'

export const NicknameDuplicationCheckField = ({ section, label, input }: FieldType) => {
  const validationState = useNicknameUniqueState()
  const validationResultMessage = useNicknameDuplicationResultMessage()

  const handleNicknameValidation = useNicknameDuplicationCheck(section)

  return (
    <InputGroup section={section}>
      <InputGroup.Label
        label={label}
        successMessage={validationState ? validationResultMessage : null}
        errorMessage={!validationState ? validationResultMessage : null}
      />
      <ValidateContainer>
        <InputGroup.Input {...input} />
        <Button size="md" onClick={handleNicknameValidation}>
          중복 확인
        </Button>
      </ValidateContainer>
    </InputGroup>
  )
}
