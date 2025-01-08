import { useNavigate } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { BottomNav } from '@/components/view/BottomNav'
import { MainHeader } from '@/components/view/header/MainHeader'
import { Loading } from '@/components/view/Loading'
import { SearchBar } from '@/components/view/SearchBar'
import { useToggle } from '@/hooks'
import { useActiveTeamList, useTeamList } from '@/services/query/useTeamQuery'
import { SESSION_KEYS } from '@/utils/constants'
import { getSessionStorageItem } from '@/utils/storage'

export const Team = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!getSessionStorageItem(SESSION_KEYS.LOGIN)

  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const { data: allTeams, isLoading: allLoading, isError: allError } = useTeamList()

  const {
    data: activeTeams,
    refetch: refetchActiveTeams,
    isLoading: activeLoading,
    isError: activeError,
  } = useActiveTeamList()

  const handleRecruitToggle = () => {
    refetchActiveTeams()
    toggleShowActiveOnly()
  }

  const handleAddTeamClick = () => navigate('/team/create')

  const isLoading = allLoading || activeLoading
  const isError = allError || activeError
  const teamsToShow = showActiveOnly ? activeTeams : allTeams

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <SearchBar currentTab="team" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>error</div>
      ) : (
        <PostList items={teamsToShow} to={`/team/detail`} />
      )}

      {isLoggedIn && <PostAdditionButton onClick={handleAddTeamClick} />}
      <BottomNav />
    </div>
  )
}
