import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

import { useBusApplicationMutation } from '@/entities/bus/api/useBus.mutation'
import type { BusApplication } from '@/entities/bus/model/bus.type'
import { useModalActions } from '@/shared/model/modal.store'
import { Button } from '@/shared/ui/Button'

export const BusApplicationButton = () => {
  const { openOneButtonModal } = useModalActions()
  const { mutate: reserveBus } = useBusApplicationMutation()

  const { handleSubmit } = useFormContext<BusApplication>()

  const handleCreateBusApplication = (formData: BusApplication) => {
    reserveBus({ body: formData }, { onSuccess: (response) => openOneButtonModal(response) })
  }

  return (
    <StyledButton size="lg" onClick={handleSubmit(handleCreateBusApplication)}>
      예약하기
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('xl', 'container')};
`
