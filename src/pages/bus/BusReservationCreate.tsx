import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BusReservationCreateForm } from '@/features/bus/ui/BusReservationCreateForm'
import { BusReservationCreateModal } from '@/features/bus/ui/BusReservationCreateModal'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const BusReservationCreate = () => {
  const navigate = useNavigate()
  const handleCancel = useCallback(() => navigate(-1), [navigate])

  return (
    <ModalStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" onClickCancel={handleCancel} />
        <Title>예약 정보 입력</Title>
        <BusReservationCreateForm />
        <BusReservationCreateModal />
      </Container>
    </ModalStoreProvider>
  )
}

const Title = styled.h4`
  ${({ theme }) => theme.margin('xl', 'container', 'page-label-bottom')};
  ${({ theme }) => theme.font(400, theme.colors.black[600])};
`
