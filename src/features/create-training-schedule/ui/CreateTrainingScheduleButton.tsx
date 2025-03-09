import { ModalStoreProvider } from '@/shared/model/modal.store'
import { Button } from '@/shared/ui/Button'

import { useCreateTrainingSchedule } from '../hook/useCreateTrainingSchedule'

const ButtonWithModal = () => {
  const { handleCreateTrainingSchedule } = useCreateTrainingSchedule()

  return (
    <>
      <Button size="lg" onClick={handleCreateTrainingSchedule}>
        추가
      </Button>
      {/* <ModalWithOneButton /> */}
    </>
  )
}

export const CreateTrainingScheduleButton = () => (
  <ModalStoreProvider>
    <ButtonWithModal />
  </ModalStoreProvider>
)
