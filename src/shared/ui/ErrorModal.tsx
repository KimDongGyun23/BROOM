import { ModalWithOneButton } from './modal/ButtonModal'

export const ErrorModal = ({
  error,
  resetErrorBoundary,
}: {
  error: unknown
  resetErrorBoundary: VoidFunction
}) => {
  // const { status } = error.response
  // const navigate = useNavigate()
  // const isNotAuthorized = status === 401 || status === 403

  console.log(error)

  return (
    <ModalWithOneButton
      label={`전역 에러 처리`}
      isModalOpen={true}
      closeModal={() => {}}
      button={{ onClickButton: resetErrorBoundary }}
    />
  )
}
