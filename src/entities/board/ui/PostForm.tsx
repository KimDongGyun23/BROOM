import { useFormContext } from 'react-hook-form'

import { FormContainer, GridContainer } from '@/app/style/commonStyles'
import type { PostFormType } from '@/entities/board/model/post.type'
import { InputGroup } from '@/shared/ui/inputGroup'

import { postAttribute } from '../config/post.attribute'

export const PostForm = () => {
  const { TITLE, TRAINING_DATE, PLACE, PERSONNEL, TIME, CONTENT } = postAttribute
  const {
    formState: { errors },
  } = useFormContext<PostFormType>()

  return (
    <FormContainer>
      <InputGroup section={TITLE.section}>
        <InputGroup.Label label={TITLE.label} />
        <InputGroup.Input {...TITLE.input} />
      </InputGroup>

      <InputGroup section={TRAINING_DATE.section}>
        <InputGroup.Label label={TRAINING_DATE.label} />
        <InputGroup.DateInput {...TRAINING_DATE.input} />
      </InputGroup>

      <InputGroup section={PLACE.section}>
        <InputGroup.Label label={PLACE.label} />
        <InputGroup.Input {...PLACE.input} />
      </InputGroup>

      <GridContainer>
        <InputGroup section={PERSONNEL.section}>
          <InputGroup.Label label={PERSONNEL.label} />
          <InputGroup.PersonnelInput />
        </InputGroup>

        <InputGroup section={TIME.section}>
          <InputGroup.Label
            label={TIME.label}
            errorMessage={errors.hour?.message || errors.minute?.message}
          />
          <InputGroup.TimeInput {...TIME.input} />
        </InputGroup>
      </GridContainer>

      <InputGroup section={CONTENT.section}>
        <InputGroup.Label label={CONTENT.label} />
        <InputGroup.TextArea {...CONTENT.input} />
      </InputGroup>
    </FormContainer>
  )
}
