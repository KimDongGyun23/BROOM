import { useNavigate } from 'react-router-dom'

import { BottomNav, MainHeader, PostAdditionButton, PostItem } from '@/components/view'
import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'
import { Loading } from '@/components/view/Loading'
import { SearchBar } from '@/components/view/SearchBar'
import { useToggle } from '@/hooks'
import { useActiveCarpoolList, useCarpoolList } from '@/services/query'
import type { PostItemType } from '@/types/post'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

type ActiveToggleProps = {
  isChecked: boolean
  onToggle: VoidFunction
}

type CarpoolListProps = {
  carpools: PostItemType[]
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

const CarpoolList = ({ carpools }: CarpoolListProps) => (
  <main className="scroll grow">
    {carpools?.map((item: PostItemType) => (
      <PostItem key={`carpool-${item.id}`} item={item} to={`/carpool/detail/${item.id}`} />
    ))}
  </main>
)

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
      <ActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>error</div>
      ) : (
        <CarpoolList carpools={carpoolsToShow || []} />
      )}
      {isLoggedIn && <PostAdditionButton onClick={handleAddCarpoolClick} />}
      <BottomNav />
    </div>
  )
}
