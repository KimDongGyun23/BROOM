import { useNavigate } from 'react-router-dom'

import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostItem } from '@/components/domain/post/PostItem'
import { BottomNav } from '@/components/view/BottomNav'
import { MainHeader } from '@/components/view/header/MainHeader'
import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'
import { Loading } from '@/components/view/Loading'
import { SearchBar } from '@/components/view/SearchBar'
import { useToggle } from '@/hooks'
import { useActiveTeamList, useTeamList } from '@/services/query/useTeamQuery'
import type { PostItemType } from '@/types/post'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

type ActiveToggleProps = {
  isChecked: boolean
  onToggle: VoidFunction
}

type TeamListProps = {
  teams: PostItemType[]
}

const ActiveToggle = ({ isChecked, onToggle }: ActiveToggleProps) => (
  <div className="mx-4 border-b border-b-grey-200">
    <button type="button" className="flex-align ml-auto gap-1 py-3" onClick={onToggle}>
      <CheckBoxIcon active={isChecked} />
      <p className={`p-small ${isChecked ? 'text-blue-500' : 'text-grey-500'}`}>
        모집 중인 글만 보기
      </p>
    </button>
  </div>
)

const TeamList = ({ teams }: TeamListProps) => (
  <main className="scroll grow">
    {teams?.map((item: PostItemType) => (
      <PostItem key={`carpool-${item.id}`} item={item} to={`/team/detail/${item.id}`} />
    ))}
  </main>
)

export const Team = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!getSessionStorageItem(SESSION_LOGIN_KEY)

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
      <ActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>error</div>
      ) : (
        <TeamList teams={teamsToShow || []} />
      )}

      {isLoggedIn && <PostAdditionButton onClick={handleAddTeamClick} />}
      <BottomNav />
    </div>
  )
}
