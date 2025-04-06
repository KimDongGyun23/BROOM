import { Button } from '@/shared/ui/Button'

import { useAddTrainingDate } from '../model/useAddTrainingDate'

export const AddTrainingDateButton = () => {
  const { handleAddTrainingDate } = useAddTrainingDate()

  return (
    <Button size="lg" onClick={handleAddTrainingDate}>
      추가
    </Button>
  )
}
