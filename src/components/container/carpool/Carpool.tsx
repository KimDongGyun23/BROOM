import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Loading } from '@/components/view/Loading'
import { MainHeader } from '@/components/view/MainHeader'
import { useToggle } from '@/hooks/useToggle'
import { useActiveCarpoolList, useCarpoolList } from '@/services/query/useCarpoolQuery'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

import { ErrorPage } from '../home/ErrorPage'

// const dummy = [
//   {
//     id: 0,
//     title: '소프트 카풀 하실 분소프트 카풀 하실 분소프트 카풀 하실 분소프트 카풀 하실 분',
//     createdAt: '12:43',
//     trainingDate: '05/21',
//     place: '종로3가 1번출구소프트 카풀 하실 분소프트 카풀 하실 분소프트 카풀 하실 분',
//     time: '07:30',
//     full: false,
//   },
//   {
//     id: 1,
//     title: '소프트 카풀 하실 분',
//     createdAt: '12:43',
//     trainingDate: '05/21',
//     place: '종로3가 1번출구',
//     time: '07:30',
//     full: false,
//   },
//   {
//     id: 2,
//     title: '소프트 카풀 하실 분',
//     createdAt: '12:43',
//     trainingDate: '05/21',
//     place: '종로3가 1번출구',
//     time: '07:30',
//     full: true,
//   },
// ]

export const Carpool = () => {
  const navigate = useNavigate()
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)
  const { data: allCarpools, isLoading: allLoading, isError: allError } = useCarpoolList()
  const {
    data: activeCarpools,
    refetch: refetchActiveCarpools,
    isLoading: activeLoading,
    isError: activeError,
  } = useActiveCarpoolList()

  const handleRecruitToggle = () => {
    refetchActiveCarpools()
    toggleShowActiveOnly()
  }

  const handleAddCarpoolClick = () => navigate('/carpool/create')

  const isLoading = allLoading || activeLoading
  const carpoolsToShow = showActiveOnly ? activeCarpools : allCarpools

  if (allError || activeError) return <ErrorPage />

  return (
    <Container>
      <MainHeader />
      <SearchBar currentTab="carpool" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : (
        <PostList items={carpoolsToShow} to={`/carpool/detail`} />
        // <PostList items={dummy} to={`/carpool/detail`} />
      )}
      {session && <PostAdditionButton onClick={handleAddCarpoolClick} />}
      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
