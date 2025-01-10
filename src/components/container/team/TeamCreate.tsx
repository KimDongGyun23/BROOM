import { FormProvider } from 'react-hook-form'

import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useTeamCreateForm } from '@/hooks/useForm'
import { useTeamCreation } from '@/services/service/useTeamCreation'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const TeamForm = () => (
  <form className="flex-column scroll mb-4 mt-5 gap-5 px-4">
    <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.MEETING_PLACE.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.MEETING_PLACE.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.MEETING_PLACE.input} />
    </InputGroup>

    <div className="grid grid-cols-2 gap-5">
      <InputGroup section={FORM_ATTRIBUTE.PERSONNEL.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.PERSONNEL.label} />
        <InputGroup.UnitInput {...FORM_ATTRIBUTE.PERSONNEL.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.TIME.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TIME.label} />
        <InputGroup.TimeInput {...FORM_ATTRIBUTE.TIME.input} />
      </InputGroup>
    </div>

    <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
      <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
    </InputGroup>
  </form>
)

export const TeamCreate = () => {
  const formMethod = useTeamCreateForm()
  const { handleSubmit } = formMethod
  const { handleTeamCreation } = useTeamCreation()

  return (
    <div className="flex-column h-svh">
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="팀원 모집 등록"
          onClickComplete={handleSubmit(handleTeamCreation)}
        />

        <TeamForm />
      </FormProvider>
    </div>
  )
}
