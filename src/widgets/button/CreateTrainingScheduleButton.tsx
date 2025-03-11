import { useCreateTrainingSchedule } from '@/features/create-training-schedule/hook/useCreateTrainingSchedule'
import { Button } from '@/shared/ui/Button'

export const CreateTrainingScheduleButton = () => {
  const { handleCreateTrainingSchedule } = useCreateTrainingSchedule()

  return (
    <Button size="lg" onClick={handleCreateTrainingSchedule}>
      추가
    </Button>
  )
}
