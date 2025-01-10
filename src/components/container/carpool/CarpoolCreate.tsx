import { FormProvider, useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useCarpoolCreateForm } from '@/hooks'
import { useCarpoolCreation } from '@/services/service/useCarpoolCreation'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const CarpoolForm = () => {
  const { setValue } = useFormContext()

  return (
    <form className="flex-column scroll mb-4 mt-5 gap-5 px-4">
      <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.DEPART_PLACE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.DEPART_PLACE.label} />
        <InputGroup.Input {...FORM_ATTRIBUTE.DEPART_PLACE.input} />
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

      <InputGroup section={FORM_ATTRIBUTE.PRICE.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.PRICE.label} />
        <div className="flex gap-5">
          <InputGroup.UnitInput {...FORM_ATTRIBUTE.PRICE.input} isPrice />
          <Button size="md" onClick={() => setValue(FORM_ATTRIBUTE.PRICE.section, 0)}>
            무료로 설정
          </Button>
        </div>
      </InputGroup>

      <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
        <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
        <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
      </InputGroup>
    </form>
  )
}

export const CarpoolCreate = () => {
  const formMethod = useCarpoolCreateForm()
  const { handleSubmit } = formMethod
  const { handleCarpoolCreation } = useCarpoolCreation()

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 등록"
        onClickComplete={handleSubmit(handleCarpoolCreation)}
      />
      <FormProvider {...formMethod}>
        <CarpoolForm />
      </FormProvider>
    </div>
  )
}
