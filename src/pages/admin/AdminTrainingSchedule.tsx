import { FormProvider, useForm } from 'react-hook-form'
import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import type { TrainingDate } from '@/entities/admin/model/admin.type'
import { AddTrainingDateButton } from '@/features/add-training-date/ui/AddTrainingDateButton'
import { InputGroup } from '@/shared/ui/inputGroup'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { TrainingDateList } from '@/widgets/list/TrainingDateList'

export const AdminTrainingSchedule = () => {
  const formMethods = useForm<TrainingDate>()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="예비군 날짜 선택" />

      <FormProvider {...formMethods}>
        <InputContainer>
          <InputGroup section="trainingDate">
            <InputGroup.DateInput />
          </InputGroup>

          <AddTrainingDateButton />
        </InputContainer>
      </FormProvider>

      <TrainingDateList />
    </Container>
  )
}

const InputContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'space-between', 'md')}
    ${theme.margin('container')}
  `}
`
