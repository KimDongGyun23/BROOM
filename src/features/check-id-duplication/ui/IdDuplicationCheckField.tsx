import { ValidateContainer } from '@/app/style/commonStyles'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useIdDuplicationCheck } from '../hook/useIdDuplicationCheck'
import type { FieldType } from '../model/field.type'
import { useIdDuplicationResultMessage, useIdUniqueState } from '../model/idDuplicationCheck.store'

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
