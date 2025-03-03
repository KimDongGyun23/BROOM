import { FormContainer } from '@/app/style/commonStyles'
import { busCreateAttribute } from '@/entities/bus/config/bus.schema'
import { InputGroup } from '@/shared/ui/inputGroup'

export const BusApplicationForm = () => {
  const { NAME, STUDENT_ID, PHONE_NUMBER } = busCreateAttribute

  return (
    <FormContainer>
      <InputGroup section={NAME.section}>
        <InputGroup.Label label={NAME.label} />
        <InputGroup.Input {...NAME.input} />
      </InputGroup>

      <InputGroup section={STUDENT_ID.section}>
        <InputGroup.Label label={STUDENT_ID.label} />
        <InputGroup.NumberInput {...STUDENT_ID.input} />
      </InputGroup>

      <InputGroup section={PHONE_NUMBER.section}>
        <InputGroup.Label label={PHONE_NUMBER.label} />
        <InputGroup.NumberInput {...PHONE_NUMBER.input} />
      </InputGroup>
    </FormContainer>
  )
}
