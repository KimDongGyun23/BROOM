import { FormProvider, useForm } from 'react-hook-form'
import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { CreateTrainingScheduleButton } from '@/features/create-training-schedule/ui/CreateTrainingScheduleButton'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { TrainingScheduleList } from '@/widgets/training-schedule-list/ui/TrainingScheduleList'

export const AdminTrainingSchedule = () => {
  const formMethods = useForm<TrainingSchedule>()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="예비군 날짜 선택" />
      <FormProvider {...formMethods}>
        <InputContainer>
          <InputGroup section="trainingDate">
            <InputGroup.DateInput />
          </InputGroup>

          <CreateTrainingScheduleButton />
        </InputContainer>
      </FormProvider>

      <TrainingScheduleList />
    </Container>
  )
}

const InputContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', 'space-between', 'md')};
  ${({ theme }) => theme.margin('container')};
`
