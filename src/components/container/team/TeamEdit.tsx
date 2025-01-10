import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useTeamEditForm } from '@/hooks'
import { useTeamUpdate } from '@/services/service/useTeamUpdate'

import { ErrorPage } from '../home/ErrorPage'

const FORM_ATT = {
  TITLE: { section: 'title', label: '제목', placeholder: '제목을 입력해주세요.' },
  DATE: { section: 'trainingDate', label: '훈련 날짜', placeholder: 'ex)20240521', type: 'number' },
  PLACE: { section: 'meetingPlace', label: '만날 장소', placeholder: '만날 장소를 입력해주세요.' },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
    placeholder: '0',
    type: 'number',
    unitLabel: '명',
  },
  TIME: { section: 'hour', label: '시간', hourSection: 'hour', minuteSection: 'minute' },
  MEMO: { section: 'content', label: '메모', placeholder: '원하시는 메모 내용을 적어주세요.' },
}

const TeamEditForm = () => (
  <form className="flex-column scroll mb-4 mt-5 gap-5 px-4">
    <InputGroup section={FORM_ATT.TITLE.section}>
      <InputGroup.Label label={FORM_ATT.TITLE.label} />
      <InputGroup.Input placeholder={FORM_ATT.TITLE.placeholder} />
    </InputGroup>

    <InputGroup section={FORM_ATT.DATE.section}>
      <InputGroup.Label label={FORM_ATT.DATE.label} />
      <InputGroup.Input type={FORM_ATT.DATE.type} placeholder={FORM_ATT.DATE.placeholder} />
    </InputGroup>

    <InputGroup section={FORM_ATT.PLACE.section}>
      <InputGroup.Label label={FORM_ATT.PLACE.label} />
      <InputGroup.Input placeholder={FORM_ATT.PLACE.placeholder} />
    </InputGroup>

    <div className="grid grid-cols-2 gap-5">
      <InputGroup section={FORM_ATT.PERSONNEL.section}>
        <InputGroup.Label label={FORM_ATT.PERSONNEL.label} />
        <InputGroup.UnitInput
          type={FORM_ATT.PERSONNEL.type}
          unitLabel={FORM_ATT.PERSONNEL.unitLabel}
          placeholder={FORM_ATT.PERSONNEL.placeholder}
        />
      </InputGroup>

      <InputGroup section={FORM_ATT.TIME.section}>
        <InputGroup.Label label={FORM_ATT.TIME.label} />
        <InputGroup.TimeInput
          hourSection={FORM_ATT.TIME.hourSection}
          minuteSection={FORM_ATT.TIME.minuteSection}
        />
      </InputGroup>
    </div>

    <InputGroup section={FORM_ATT.MEMO.section}>
      <InputGroup.Label label={FORM_ATT.MEMO.label} />
      <InputGroup.TextArea placeholder={FORM_ATT.MEMO.placeholder} />
    </InputGroup>
  </form>
)

export const TeamEdit = () => {
  const { id } = useParams()
  if (!id) return <ErrorPage />

  const formMethod = useTeamEditForm({ urls: { teamBoardId: parseInt(id as string) } })

  const { handleSubmit } = formMethod
  const { handleSubmitForm } = useTeamUpdate(id as string)

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon
        type="complete"
        title="팀원 모집 수정"
        onClickComplete={handleSubmit(handleSubmitForm)}
      />
      <FormProvider {...formMethod}>
        <TeamEditForm />
      </FormProvider>
    </div>
  )
}
