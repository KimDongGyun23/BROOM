import { FormProvider, useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useCarpoolEditForm } from '@/hooks'
import { useCarpoolUpdate } from '@/services/service/useCarpoolUpdate'

import { ErrorPage } from '../home/ErrorPage'

const FORM_ATT = {
  TITLE: { section: 'title', label: '제목', placeholder: '제목을 입력해주세요.' },
  DATE: { section: 'trainingDate', label: '훈련 날짜', placeholder: 'ex)20240521', type: 'number' },
  PLACE: { section: 'departPlace', label: '출발 장소', placeholder: '출발 장소를 입력해주세요.' },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
    placeholder: '0',
    type: 'number',
    unitLabel: '명',
  },
  TIME: { section: 'hour', label: '시간', hourSection: 'hour', minuteSection: 'minute' },
  PRICE: { section: 'price', label: '금액', placeholder: '0', unitLabel: '원' },
  MEMO: { section: 'memo', label: '메모', placeholder: '원하시는 메모 내용을 적어주세요.' },
}

const CarpoolEditForm = () => {
  const { setValue } = useFormContext()

  return (
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

      <InputGroup section={FORM_ATT.PRICE.section}>
        <InputGroup.Label label={FORM_ATT.PRICE.label} />
        <div className="flex gap-5">
          <InputGroup.UnitInput
            unitLabel={FORM_ATT.PRICE.unitLabel}
            placeholder={FORM_ATT.PRICE.placeholder}
            isPrice
          />
          <Button size="md" onClick={() => setValue(FORM_ATT.PRICE.section, 0)}>
            무료로 설정
          </Button>
        </div>
      </InputGroup>

      <InputGroup section={FORM_ATT.MEMO.section}>
        <InputGroup.Label label={FORM_ATT.MEMO.label} />
        <InputGroup.TextArea placeholder={FORM_ATT.MEMO.placeholder} />
      </InputGroup>
    </form>
  )
}

export const CarpoolEdit = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return <ErrorPage />

  const formMethod = useCarpoolEditForm({ urls: { carpoolBoardId: parseInt(id as string) } })

  const { handleSubmit } = formMethod
  const { handleSubmitForm } = useCarpoolUpdate(id as string)

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon
        type="complete"
        title="카풀 모집 수정"
        onClickComplete={handleSubmit(handleSubmitForm)}
      />
      <FormProvider {...formMethod}>
        <CarpoolEditForm />
      </FormProvider>
    </div>
  )
}
