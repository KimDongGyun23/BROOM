import { useAddTrainingDate } from '@/features/add-training-date/hook/useAddTrainingDate'
import { Button } from '@/shared/ui/Button'

export const AddTrainingDateButton = () => {
  const { handleAddTrainingDate } = useAddTrainingDate()

  return (
    <Button size="lg" onClick={handleAddTrainingDate}>
      추가
    </Button>
  )
}
