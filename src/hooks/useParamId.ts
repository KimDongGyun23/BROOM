import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useParamId = (): number => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      navigate('/404', { replace: true })
    }
  }, [id, navigate])

  const parsedId = parseInt(id || '')

  if (isNaN(parsedId)) {
    navigate('/404', { replace: true })
  }

  return parsedId
}
