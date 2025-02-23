import { FlexColumnContainer } from '@/app/style/commonStyles'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { BoardMainList } from '@/features/board/ui/BoardMainList'
import { PostAdditionButton } from '@/features/board/ui/PostAdditionButton'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Board = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <FlexColumnContainer>
        <MainHeader secondary title="승차 공유" />
        <SearchBar />
        <ShowActivePostsButton />
        <BoardMainList />
        <PostAdditionButton />
        <BottomNavigation />
      </FlexColumnContainer>
    </ActiveOnlyFilterStoreProvider>
  )
}
