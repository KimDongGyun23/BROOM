import { FormContainer } from '@/app/style/commonStyles'
import { accountAttribute } from '@/entities/mypage/config/account.attribute'
import { NicknameDuplicationCheckField } from '@/features/auth/check-duplication/ui/NicknameDuplicationCheckField'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useResetAccountForm } from '../model/useResetAccountForm'

export const UpdateAccountForm = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountAttribute

  useResetAccountForm()

  return (
    <FormContainer $isFull>
      <NicknameDuplicationCheckField {...NICKNAME} />

      <InputGroup section={DISCHARGE_YEAR.section}>
        <InputGroup.Label label={DISCHARGE_YEAR.label} />
        <InputGroup.NumberInput {...DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={MILITARY_BRANCH.section}>
        <InputGroup.Label label={MILITARY_BRANCH.label} />
        <InputGroup.SortOfArmy />
      </InputGroup>
    </FormContainer>
  )
}
