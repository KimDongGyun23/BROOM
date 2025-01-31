import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useCarpoolEditForm } from '@/hooks/useForm'
import { useCarpoolUpdate } from '@/services/service/useCarpoolUpdate'
import { FORM_ATTRIBUTE } from '@/utils/constants'

import { ErrorPage } from '../home/ErrorPage'

const CarpoolEditForm = () => (
  <CarpoolFormContainer>
    <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.CARPOOL_PLACE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.CARPOOL_PLACE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.CARPOOL_PLACE.input} />
    </InputGroup>

    <GridContainer>
      <InputGroup section={FORM_ATTRIBUTE.PERSONNEL.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.PERSONNEL.label} />
        <InputGroup.UnitInput {...FORM_ATTRIBUTE.PERSONNEL.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.TIME.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TIME.label} />
        <InputGroup.TimeInput {...FORM_ATTRIBUTE.TIME.input} />
      </InputGroup>
    </GridContainer>

    <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
      <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
    </InputGroup>
  </CarpoolFormContainer>
)

export const CarpoolEdit = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return <ErrorPage />

  const formMethod = useCarpoolEditForm({ urls: { carpoolBoardId: parseInt(id as string) } })

  const { handleSubmit } = formMethod
  const { handleSubmitForm } = useCarpoolUpdate(id as string)

  return (
    <Container>
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 수정"
        onClickComplete={handleSubmit(handleSubmitForm)}
      />
      <FormProvider {...formMethod}>
        <CarpoolEditForm />
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const CarpoolFormContainer = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 0)};
  ${({ theme }) => theme.padding('lg')};
  overflow-y: scroll;
`

const GridContainer = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'xl')};
`
