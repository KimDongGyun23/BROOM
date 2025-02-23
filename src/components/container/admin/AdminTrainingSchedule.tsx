import { FormProvider, useForm } from 'react-hook-form'

import { Container } from '@/app/style/commonStyles'
import { TrainingScheduleInput } from '@/components/domain/admin/TrainingScheduleInput'
import { TrainingScheduleList } from '@/components/domain/admin/TrainingScheduleList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useTrainingScheduleList } from '@/stores/trainingSchedule'

type DateFormType = {
  dateInput: string
}

export const AdminTrainingSchedule = () => {
  const selectedDates = useTrainingScheduleList()

  const formMethods = useForm<DateFormType>()
  const { handleSubmit } = formMethods

  const handleSubmitDates = () => {
    if (selectedDates.size === 0) {
      // 날짜 선택 에러? 모달? 중 하나
      return
    }

    const submissionData = [...selectedDates]
    console.log('제출된 날짜:', submissionData)

    // 폼 제출
  }

  return (
    <Container>
      <SubHeaderWithoutIcon
        type="complete"
        title="예비군 날짜 선택"
        onClickComplete={handleSubmit(handleSubmitDates)}
      />
      <FormProvider {...formMethods}>
        <TrainingScheduleInput />
      </FormProvider>

      <TrainingScheduleList />
    </Container>
  )
}
