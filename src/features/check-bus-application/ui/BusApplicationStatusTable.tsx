import { styled } from 'styled-components'

import {
  BUS_APPLICATION_STATUS,
  type BusApplicationStatus,
} from '@/entities/bus/config/bus.constant'

import { useBusApplicationStatus } from '../model/busApplication'

export const BusApplicationStatusTable = () => {
  const applicationStatus = useBusApplicationStatus()

  return (
    <Container>
      <Label>신청 여부</Label>
      <Status $status={applicationStatus}>{applicationStatus}</Status>
    </Container>
  )
}

const Container = styled.section`
  ${({ theme }) => `
    ${theme.gridBox('1fr 1fr')}
    ${theme.margin('4xl', 'container', 'xl')}
    ${theme.border('divider', 'top', 'bottom')}
  `}
  text-align: center;
`

const Label = styled.p`
  ${({ theme }) => `
    ${theme.padding('md', 'lg')}
    ${theme.font(800, theme.colors.black[600])}
  `}
`

const Status = styled.p<{ $status: BusApplicationStatus }>`
  ${({ theme, $status }) => `
    ${theme.padding('md', 'lg')}
    ${(() => {
      switch ($status) {
        case BUS_APPLICATION_STATUS.COMPLETED:
          return theme.font(800, theme.colors.blue[500])
        case BUS_APPLICATION_STATUS.NOT_FOUND:
          return theme.font(800, theme.colors.error)
        case BUS_APPLICATION_STATUS.PENDING:
          return theme.font(800, theme.colors.black[400])
        default:
          return theme.font(800, theme.colors.black[400])
      }
    })()}
  `}
`
