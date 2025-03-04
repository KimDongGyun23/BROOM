import { FormContainer } from '@/app/style/commonStyles'
import { accountInformationAttribute } from '@/entities/mypage/model/mypage.schema'
import { NicknameDuplicationCheckField } from '@/features/check-nickname-duplication/ui/NicknameDuplicationCheckField'
import { InputGroup } from '@/shared/ui/inputGroup'

export const AccountInformationEditForm = () => {
  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = accountInformationAttribute

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
