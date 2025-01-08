import { useNavigate } from 'react-router-dom'

import {
  BottomNav,
  CheckBoxIcon,
  Loading,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchBar,
} from '@/components/view'
import { useToggle } from '@/hooks'
import { useActiveTeammateList, useTeammateList } from '@/services/query'
import type { PostItemType } from '@/types/post'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

type ActiveToggleProps = {
  isChecked: boolean
  onToggle: VoidFunction
}

type TeammateListProps = {
  teammates: PostItemType[]
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

const TeammateList = ({ teammates }: TeammateListProps) => (
  <main className="scroll grow">
    {teammates?.map((item: PostItemType) => (
      <PostItem key={`carpool-${item.id}`} item={item} to={`/teammate/detail/${item.id}`} />
    ))}
  </main>
)

export const Teammate = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!getSessionStorageItem(SESSION_LOGIN_KEY)

  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const { data: allTeammates, isLoading: allLoading, isError: allError } = useTeammateList()

  const {
    data: activeTeammates,
    refetch: refetchActiveTeammates,
    isLoading: activeLoading,
    isError: activeError,
  } = useActiveTeammateList()

  const handleRecruitToggle = () => {
    refetchActiveTeammates()
    toggleShowActiveOnly()
  }

  const handleAddTeammateClick = () => navigate('/teammate/create')

  const isLoading = allLoading || activeLoading
  const isError = allError || activeError
  const teammatesToShow = showActiveOnly ? activeTeammates : allTeammates

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <SearchBar currentTab="teammate" />
      <ActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>error</div>
      ) : (
        <TeammateList teammates={teammatesToShow || []} />
      )}

      {isLoggedIn && <PostAdditionButton onClick={handleAddTeammateClick} />}
      <BottomNav />
    </div>
  )
}
