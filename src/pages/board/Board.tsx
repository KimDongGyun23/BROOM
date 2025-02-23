import { FlexColumnContainer } from '@/app/style/commonStyles'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { BoardMainList } from '@/features/board/ui/BoardMainList'
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
