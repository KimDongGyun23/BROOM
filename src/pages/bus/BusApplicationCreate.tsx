import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { busCreateSchema } from '@/entities/bus/config/bus.schema'
import type { BusApplication } from '@/entities/bus/model/bus.type'
import { BusApplicationButton } from '@/features/create-bus/ui/BusApplicationButton'
import { useCustomForm } from '@/shared/hook/useCustomForm'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { BusApplicationForm } from '@/widgets/bus-form/ui/BusApplicationForm'

export const BusApplicationCreate = () => {
  const navigate = useNavigate()
  const formMethod = useCustomForm<BusApplication>(busCreateSchema)

  return (
    <ModalStoreProvider>
      <Container>
        <FormProvider {...formMethod}>
          <SubHeaderWithoutIcon type="null" />
          <Title>신청 정보 입력</Title>
          <BusApplicationForm />
          <BusApplicationButton />
          <ModalWithOneButton
            onClickButton={() => navigate('/bus-application', { replace: true })}
          />
        </FormProvider>
      </Container>
    </ModalStoreProvider>
  )
}

const Title = styled.h4`
  ${({ theme }) => `
    ${theme.margin('page-label')}
    ${theme.font(400, theme.colors.black[600])}
  `}
`
