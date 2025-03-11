import { FormProvider, useForm } from 'react-hook-form'
import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import type { TrainingSchedule } from '@/entities/admin/model/admin.type'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { CreateTrainingScheduleButton } from '@/widgets/button/CreateTrainingScheduleButton'
import { TrainingScheduleList } from '@/widgets/list/TrainingScheduleList'

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
