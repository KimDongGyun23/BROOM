import styled from 'styled-components'

import { CarpoolDetailFooter } from '@/components/domain/carpool/CarpoolDetailFooter'
import { CarpoolDetailHeader } from '@/components/domain/carpool/CarpoolDetailHeader'
import { Loading } from '@/components/view/Loading'
import { PostDetailContent } from '@/components/view/post/PostDetailContent'
import { PostProfile } from '@/components/view/Profile'
import { useCarpoolInitialize } from '@/services/service/useCarpoolInitialize'

import { ErrorPage } from '../home/ErrorPage'

export const CarpoolDetail = () => {
  const { carpoolDetail, isPending, isError } = useCarpoolInitialize()

  if (isPending) return <Loading />
  if (isError || !carpoolDetail) return <ErrorPage />

  return (
    <Container>
      <CarpoolDetailHeader />
      <PostProfile />
      <PostDetailContent />
      <CarpoolDetailFooter />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`
