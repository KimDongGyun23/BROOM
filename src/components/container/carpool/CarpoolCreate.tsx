import { FormProvider, useFormContext } from 'react-hook-form'

import { Button } from '@/components/view/Button'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { useCarpoolCreateForm } from '@/hooks'
import { useCarpoolCreation } from '@/services/service'

const CarpoolForm = () => {
  const { setValue } = useFormContext()

  return (
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
        <InputGroup.Label section="departPlace" label="출발 장소" />
        <InputGroup.Input section="departPlace" placeholder="출발 장소를 입력해주세요." />
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
        <InputGroup.Label section="price" label="금액" />
        <div className="flex gap-5">
          <InputGroup.UnitInput section="price" unitLabel="원" isPrice placeholder="0" />
          <Button size="md" onClick={() => setValue('price', 0)}>
            무료로 설정
          </Button>
        </div>
      </InputGroup>

      <InputGroup>
        <InputGroup.Label section="content" label="메모" />
        <InputGroup.TextArea section="content" placeholder="원하시는 메모 내용을 적어주세요." />
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
        title="카풀 모집 등록"
        onClickComplete={handleSubmit(handleCarpoolCreation)}
      />
      <FormProvider {...formMethod}>
        <CarpoolForm />
      </FormProvider>
    </div>
  )
}
