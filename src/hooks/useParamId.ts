import { useNavigate, useParams } from 'react-router-dom'

export const useParamId = (): string => {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  if (id === '') {
    navigate('/404', { replace: true })
  }

  return id
}
