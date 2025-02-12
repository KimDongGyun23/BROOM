import { FormProvider } from 'react-hook-form'

import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { postAttribute } from '@/forms/useCarpoolCreateForm'
import { useCarpoolEditForm } from '@/forms/useCarpoolEditForm'
import { Container, FormContainer, GridContainer } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

export const CarpoolEdit = () => {
  const { formMethod, isPending, isError, onSubmit } = useCarpoolEditForm()
  const { TITLE, TRAINING_DATE, PLACE, PERSONNEL, TIME, CONTENT } = postAttribute
  const {
    formState: { errors },
  } = formMethod

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <Container>
      <SubHeaderWithoutIcon type="complete" title="승차 공유 수정" onClickComplete={onSubmit} />
      <FormProvider {...formMethod}>
        <FormContainer>
          <InputGroup section={TITLE.section}>
            <InputGroup.Label label={TITLE.label} />
            <InputGroup.Input {...TITLE.input} />
          </InputGroup>

          <InputGroup section={TRAINING_DATE.section}>
            <InputGroup.Label label={TRAINING_DATE.label} />
            <InputGroup.Input {...TRAINING_DATE.input} />
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
    </Container>
  )
}
