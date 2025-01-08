import { useNavigate } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { BottomNav } from '@/components/view/BottomNav'
import { MainHeader } from '@/components/view/header/MainHeader'
import { Loading } from '@/components/view/Loading'
import { SearchBar } from '@/components/view/SearchBar'
import { useToggle } from '@/hooks'
import { useActiveCarpoolList, useCarpoolList } from '@/services/query'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

export const Carpool = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!getSessionStorageItem(SESSION_LOGIN_KEY)

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
  const isError = allError || activeError
  const carpoolsToShow = showActiveOnly ? activeCarpools : allCarpools

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <SearchBar currentTab="carpool" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>error</div>
      ) : (
        <PostList items={carpoolsToShow || []} to={`/carpool/detail`} />
      )}
      {isLoggedIn && <PostAdditionButton onClick={handleAddCarpoolClick} />}
      <BottomNav />
    </div>
  )
}
