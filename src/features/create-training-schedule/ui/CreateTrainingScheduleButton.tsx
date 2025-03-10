import { Button } from '@/shared/ui/Button'

import { useCreateTrainingSchedule } from '../hook/useCreateTrainingSchedule'

export const CreateTrainingScheduleButton = () => {
  const { handleCreateTrainingSchedule } = useCreateTrainingSchedule()

  return (
    <Button size="lg" onClick={handleCreateTrainingSchedule}>
      추가
    </Button>
  )
}
