import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useTeamEditForm } from '@/hooks'
import { useTeamUpdate } from '@/services/service/useTeammateUpdate'

const TeamEditForm = () => (
  <form className="flex-column scroll mb-4 mt-5 gap-5 px-4">
    <InputGroup>
      <InputGroup.Label section="title" label="제목" />
      <InputGroup.Input section="title" placeholder="제목을 입력해주세요." />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="trainingDate" label="훈련 날짜" />
      <InputGroup.Input section="trainingDate" type="number" placeholder="ex)20240521" />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="meetingPlace" label="만날 장소" />
      <InputGroup.Input section="meetingPlace" placeholder="만날 장소를 입력해주세요." />
    </InputGroup>

    <div className="grid grid-cols-2 gap-5">
      <InputGroup>
        <InputGroup.Label section="personnel" label="모집 인원" />
        <InputGroup.UnitInput section="personnel" type="number" unitLabel="명" placeholder="0" />
      </InputGroup>

      <InputGroup>
        <InputGroup.Label section="hour" label="시간" />
        <InputGroup.TimeInput hourSection="hour" minuteSection="minute" />
      </InputGroup>
    </div>

    <InputGroup>
      <InputGroup.Label section="memo" label="메모" />
      <InputGroup.TextArea section="memo" placeholder="원하시는 메모 내용을 적어주세요." />
    </InputGroup>
  </form>
)

export const TeamEdit = () => {
  const { id } = useParams()
  const formMethod = useTeamEditForm({ urls: { teamBoardId: parseInt(id as string) } })

  const { handleSubmit } = formMethod
  const { handleSubmitForm } = useTeamUpdate(id as string)

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon
        type="complete"
        title="팀원 모집 등록"
        onClickComplete={handleSubmit(handleSubmitForm)}
      />
      <FormProvider {...formMethod}>
        <TeamEditForm />
      </FormProvider>
    </div>
  )
}
