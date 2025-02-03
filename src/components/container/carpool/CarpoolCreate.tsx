import { FormProvider } from 'react-hook-form'

import { InputGroup } from '@/components/view/inputGroup'
import { FormContainer, GridContainer, PostContainer } from '@/components/view/post/PostStyle'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { postAttribute, useCarpoolCreateForm } from '@/forms/useCarpoolCreateForm'

export const CarpoolCreate = () => {
  const { TITLE, TRAINING_DATE, PLACE, PERSONNEL, TIME, CONTENT } = postAttribute
  const { formMethod, onSubmit } = useCarpoolCreateForm()
  const {
    formState: { errors },
  } = formMethod

  return (
    <PostContainer>
      <SubHeaderWithoutIcon type="complete" title="승차 공유 등록" onClickComplete={onSubmit} />
      <FormProvider {...formMethod}>
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
      </FormProvider>
    </PostContainer>
  )
}
