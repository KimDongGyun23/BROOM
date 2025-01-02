import { Link, useNavigate } from 'react-router-dom'

import {
  ArrowBottomIcon,
  BottomNav,
  CheckBoxIcon,
  Loading,
  MainHeader,
  PostAdditionButton,
  PostItem,
  SearchIcon,
} from '@/components/view'
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

const SearchBar = () => (
  <Link to="/carpool/search">
    <div className="p-medium flex-align mx-4 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular">
      <div className="flex-align shrink-0 gap-1">
        <p className="p-small shrink-0 text-grey-6">제목</p>
        <ArrowBottomIcon />
      </div>
      <input
        className="flex-1 text-grey-7 outline-none placeholder:text-grey-4"
        size={7}
        placeholder="검색어를 입력해주세요."
      />
      <SearchIcon />
    </div>
  </Link>
)

const ActiveToggle = ({ isChecked, onToggle }: ActiveToggleProps) => (
  <div className="mx-4 border-b border-b-grey-2">
    <button type="button" className="flex-align ml-auto gap-1 py-3" onClick={onToggle}>
      <CheckBoxIcon active={isChecked} />
      <p className={`p-small ${isChecked ? 'text-blue-5' : 'text-grey-5'}`}>모집 중인 글만 보기</p>
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
      <SearchBar />
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
