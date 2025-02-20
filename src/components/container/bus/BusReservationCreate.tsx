import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { BusReservationCreateForm } from '@/components/domain/bus/BusReservationCreateForm'
import { BusReservationCreateModal } from '@/components/domain/bus/BusReservationCreateModal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { ModalStoreProvider } from '@/stores/modal'
import { Container } from '@/styles/commonStyles'

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
