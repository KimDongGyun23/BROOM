import { ValidateContainer } from '@/app/style/commonStyles'
import { useIdDuplicationCheck } from '@/features/check-id-duplication/hook/useIdDuplicationCheck'
import {
  useIdDuplicationResultMessage,
  useIdUniqueState,
} from '@/features/check-id-duplication/model/idDuplicationCheck.store'
import type { FieldType } from '@/features/check-nickname-duplication/model/field.type'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

export const IdDuplicationCheckField = ({ section, label, input }: FieldType) => {
  const isIdUnique = useIdUniqueState()
  const duplicationResultMessage = useIdDuplicationResultMessage()

  const handleIdValidation = useIdDuplicationCheck(section)

  return (
    <InputGroup section={section}>
      <InputGroup.Label
        label={label}
        successMessage={isIdUnique ? duplicationResultMessage : null}
        errorMessage={!isIdUnique ? duplicationResultMessage : null}
      />
      <ValidateContainer>
        <InputGroup.Input {...input} />
        <Button size="md" onClick={handleIdValidation}>
          중복 확인
        </Button>
      </ValidateContainer>
    </InputGroup>
  )
}
