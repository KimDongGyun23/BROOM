import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useTeamCreateForm } from '@/hooks/useForm'
import { useTeamCreation } from '@/services/service/useTeamCreation'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const TeamForm = () => (
  <TeamFormContainer>
    <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.MEETING_PLACE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.MEETING_PLACE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.MEETING_PLACE.input} />
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
  </TeamFormContainer>
)

export const TeamCreate = () => {
  const formMethod = useTeamCreateForm()
  const { handleSubmit } = formMethod
  const { handleTeamCreation } = useTeamCreation()

  return (
    <Container>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="팀원 모집 등록"
          onClickComplete={handleSubmit(handleTeamCreation)}
        />

        <TeamForm />
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const TeamFormContainer = styled.form`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
  ${({ theme }) => theme.margin('container', 'container', 'container', 'container')};
  overflow-y: scroll;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
