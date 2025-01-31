import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useCarpoolCreateForm } from '@/hooks/useForm'
import { useCreatePost } from '@/services/query/usePostQuery'
import type { PostForm } from '@/types/post'
import { FORM_ATTRIBUTE, TAB_UPPER_KEYS } from '@/utils/constants'

export const CarpoolCreate = () => {
  const navigate = useNavigate()
  const { mutate: createCarpool } = useCreatePost()

  const formMethod = useCarpoolCreateForm()
  const {
    handleSubmit,
    formState: { errors },
  } = formMethod

  const handleCarpoolCreation = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      category: TAB_UPPER_KEYS[0],
      personnel: parseInt(personnel),
      ...rest,
    }

    createCarpool(
      { body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/carpool/detail/${boardId}`, { replace: true }) },
    )
  }

  return (
    <Container>
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 등록"
        onClickComplete={handleSubmit(handleCarpoolCreation)}
      />
      <FormProvider {...formMethod}>
        <FormContainer>
          <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
            <InputGroup.DateInput {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.CARPOOL_PLACE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.CARPOOL_PLACE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.CARPOOL_PLACE.input} />
          </InputGroup>

          <GridContainer>
            <InputGroup section={FORM_ATTRIBUTE.PERSONNEL.section}>
              <InputGroup.Label label={FORM_ATTRIBUTE.PERSONNEL.label} />
              <InputGroup.PersonnelInput />
            </InputGroup>

            <InputGroup section={FORM_ATTRIBUTE.TIME.section}>
              <InputGroup.Label
                label={FORM_ATTRIBUTE.TIME.label}
                errorMessage={errors.hour?.message || errors.minute?.message}
              />
              <InputGroup.TimeInput {...FORM_ATTRIBUTE.TIME.input} />
            </InputGroup>
          </GridContainer>

          <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
            <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
          </InputGroup>
        </FormContainer>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const FormContainer = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 0)};
  ${({ theme }) => theme.padding('lg')};
  overflow-y: scroll;
`

const GridContainer = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
`
