import { useFormContext } from 'react-hook-form'
import { styled } from 'styled-components'

import { useTrainingScheduleActions } from '@/shared/model/trainingSchedule.type'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

export const TrainingScheduleInput = () => {
  const { getValues, resetField } = useFormContext()
  const { addTrainingDate } = useTrainingScheduleActions()

  const handleAddDate = () => {
    const inputDate = getValues('dateInput')

    addTrainingDate(inputDate)
    resetField('dateInput')
  }

  return (
    <Container>
      <InputGroup section="dateInput">
        <InputGroup.DateInput />
      </InputGroup>
      <Button size="lg" onClick={handleAddDate}>
        추가
      </Button>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};
  ${({ theme }) => theme.margin('container')};
`
