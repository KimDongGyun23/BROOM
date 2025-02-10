import { useNavigate } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { instance } from '@/services/query'
import { usePostListData } from '@/services/service/usePostListData'
import { Container } from '@/styles/commonStyles'

export const Carpool = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()

  const { isPending, isError, hasNextPage, fetchNextPage, showActiveOnly, toggleShowActiveOnly } =
    usePostListData()
  const handleAddCarpoolClick = () => navigate('/carpool/create')

  return (
    <Container>
      <MainHeader />
      <SearchBar currentTab="carpool" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={toggleShowActiveOnly} />
      <PostList
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      {session && <PostAdditionButton onClick={handleAddCarpoolClick} />}
      <BottomNavigation />
    </Container>
  )
}
