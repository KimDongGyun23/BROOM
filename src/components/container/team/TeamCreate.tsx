import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { FormContainer, GridContainer, PostContainer } from '@/components/view/post/PostStyle'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useCustomForm } from '@/hooks/useCustomForm'
import { useCreatePost } from '@/services/query/usePostQuery'
import type { PostForm } from '@/types/post'
import { TAB_UPPER_KEYS } from '@/utils/constants'
import { FORM_ATTRIBUTE, postSchema } from '@/utils/schema'

export const TeamCreate = () => {
  const navigate = useNavigate()
  const { mutate: createPost } = useCreatePost()
  const formMethod = useCustomForm<PostForm>(postSchema)
  const {
    handleSubmit,
    formState: { errors },
  } = formMethod

  const handlePostCreation = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      category: TAB_UPPER_KEYS[1],
      personnel: parseInt(personnel as string),
      ...rest,
    }

    createPost(
      { body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/team/detail/${boardId}`, { replace: true }) },
    )
  }

  return (
    <PostContainer>
      <FormProvider {...formMethod}>
        <SubHeaderWithoutIcon
          type="complete"
          title="팀원 모집 등록"
          onClickComplete={handleSubmit(handlePostCreation)}
        />

        <FormContainer>
          <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
            <InputGroup.DateInput {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.TEAM_PLACE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TEAM_PLACE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.TEAM_PLACE.input} />
          </InputGroup>

          <GridContainer>
            <InputGroup section={FORM_ATTRIBUTE.PERSONNEL.section}>
              <InputGroup.Label label={FORM_ATTRIBUTE.PERSONNEL.label} />
              <InputGroup.PersonnelInput />
            </InputGroup>

            <InputGroup section={FORM_ATTRIBUTE.TIME.section}>
              <InputGroup.Label
                label={FORM_ATTRIBUTE.TIME.label}
                errorMessage={errors.hour?.message || errors.minute?.message}
              />
              <InputGroup.TimeInput {...FORM_ATTRIBUTE.TIME.input} />
            </InputGroup>
          </GridContainer>

          <InputGroup section={FORM_ATTRIBUTE.MEMO.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.MEMO.label} />
            <InputGroup.TextArea {...FORM_ATTRIBUTE.MEMO.input} />
          </InputGroup>
        </FormContainer>
      </FormProvider>
    </PostContainer>
  )
}
