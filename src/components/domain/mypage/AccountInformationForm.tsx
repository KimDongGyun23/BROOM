import { FormProvider } from 'react-hook-form'

import { InputGroup } from '@/components/view/inputGroup'
import {
  accountInformationAttribute,
  useAccountInformationForm,
} from '@/forms/useAccountInformationForm'
import { FormContainer } from '@/styles/commonStyles'

export const AccountInformationForm = () => {
  const formMethod = useAccountInformationForm()
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

  return (
    <FormProvider {...formMethod}>
      <FormContainer $isFull>
        <InputGroup section={NICKNAME.section}>
          <InputGroup.Label label={NICKNAME.label} />
          <InputGroup.Input readOnly {...NICKNAME.input} />
        </InputGroup>

        <InputGroup section={DISCHARGE_YEAR.section}>
          <InputGroup.Label label={DISCHARGE_YEAR.label} />
          <InputGroup.Input readOnly {...DISCHARGE_YEAR.input} />
        </InputGroup>

        <InputGroup section={MILITARY_BRANCH.section}>
          <InputGroup.Label label={MILITARY_BRANCH.label} />
          <InputGroup.SortOfArmy disabled />
        </InputGroup>
      </FormContainer>
    </FormProvider>
  )
}
