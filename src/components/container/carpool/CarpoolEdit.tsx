import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { FormContainer, GridContainer, PostContainer } from '@/components/view/post/PostStyle'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useCustomForm } from '@/hooks/useCustomForm'
import { useParamId } from '@/hooks/useParamId'
import { useFetchUpdatePostData, useUpdatePost } from '@/services/query/usePostQuery'
import type { PostForm } from '@/types/post'
import { TAB_UPPER_KEYS } from '@/utils/constants'
import { FORM_ATTRIBUTE, postSchema } from '@/utils/schema'

import { ErrorPage } from '../home/ErrorPage'

export const CarpoolEdit = () => {
  const boardId = useParamId()
  const navigate = useNavigate()
  const { data: prevData, isPending, isError } = useFetchUpdatePostData({ urls: { boardId } })
  const { mutate: postUpdate } = useUpdatePost()

  let defaultValues = { ...prevData }
  const formMethod = useCustomForm<PostForm>(postSchema, { defaultValues })
  const {
    handleSubmit,
    formState: { errors },
  } = formMethod

  const handleSubmitForm = (formData: PostForm) => {
    const { hour, minute, personnel, ...rest } = formData
    const submissionData = {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      category: TAB_UPPER_KEYS[0],
      personnel: parseInt(personnel as string),
      ...rest,
    }

    postUpdate(
      { urls: { boardId }, body: submissionData },
      { onSuccess: ({ boardId }) => navigate(`/carpool/detail/${boardId}`, { replace: true }) },
    )
  }

  if (isPending) return <Loading />
  if (isError || !prevData) return <ErrorPage />

  return (
    <PostContainer>
      <SubHeaderWithoutIcon
        type="complete"
        title="승차 공유 수정"
        onClickComplete={handleSubmit(handleSubmitForm)}
      />
      <FormProvider {...formMethod}>
        <FormContainer>
          <InputGroup section={FORM_ATTRIBUTE.TITLE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TITLE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.TITLE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.TRAINING_DATE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.TRAINING_DATE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.TRAINING_DATE.input} />
          </InputGroup>

          <InputGroup section={FORM_ATTRIBUTE.CARPOOL_PLACE.section}>
            <InputGroup.Label label={FORM_ATTRIBUTE.CARPOOL_PLACE.label} />
            <InputGroup.Input {...FORM_ATTRIBUTE.CARPOOL_PLACE.input} />
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
