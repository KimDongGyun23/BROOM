import { ValidateContainer } from '@/app/style/commonStyles'
import type { FieldType } from '@/features/check-id-duplication/model/field.type'
import { useNicknameDuplicationCheck } from '@/features/check-nickname-duplication/hook/useNicknameDuplicationCheck'
import {
  useNicknameDuplicationResultMessage,
  useNicknameUniqueState,
} from '@/features/check-nickname-duplication/model/nicknameDuplicationCheck.store'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

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
