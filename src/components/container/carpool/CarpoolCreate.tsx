import { FormProvider, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useCarpoolCreateForm } from '@/hooks/useForm'
import { useCarpoolCreation } from '@/services/service/useCarpoolCreation'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const CarpoolForm = () => {
  const { setValue } = useFormContext()

  return (
    <CarpoolFormContainer>
      <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.DEPART_PLACE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.DEPART_PLACE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.DEPART_PLACE.input} />
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

      <InputGroup section={FORM_ATTRIBUTE.PRICE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.PRICE.label} />
        <InputContainerWithGap>
          <InputGroup.UnitInput {...FORM_ATTRIBUTE.PRICE.input} isPrice />
          <Button size="md" onClick={() => setValue(FORM_ATTRIBUTE.PRICE.section, 0)}>
            무료로 설정
          </Button>
        </InputContainerWithGap>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
        <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
      </InputGroup>
    </CarpoolFormContainer>
  )
}

export const CarpoolCreate = () => {
  const formMethod = useCarpoolCreateForm()
  const { handleSubmit } = formMethod
  const { handleCarpoolCreation } = useCarpoolCreation()

  return (
    <Container>
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 등록"
        onClickComplete={handleSubmit(handleCarpoolCreation)}
      />
      <FormProvider {...formMethod}>
        <CarpoolForm />
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
  ${({ theme }) => theme.gridBox('1fr 1fr', undefined, undefined, undefined, 'lg')};
`

const InputContainerWithGap = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, undefined, 'xl')};
`
