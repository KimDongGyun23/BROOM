import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { Container, FormContainer } from '@/app/style/commonStyles'
import { busCreateAttribute, busCreateSchema } from '@/entities/bus/config/bus.schema'
import type { BusApplication } from '@/entities/bus/model/bus.type'
import { BusApplicationButton } from '@/widgets/button/BusApplicationButton'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const BusApplicationCreate = () => {
  const { NAME, STUDENT_ID, PHONE_NUMBER } = busCreateAttribute

  const formMethod = useCustomForm<BusApplication>(busCreateSchema)

  return (
    <Container>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon type="null" />
        <Title>신청 정보 입력</Title>

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

        <BusApplicationButton />
      </FormProvider>
    </Container>
  )
}

const Title = styled.h4`
  ${({ theme }) => `
    ${theme.margin('page-label')}
    ${theme.font(400, theme.colors.black[600])}
  `}
`
