import { FlexColumnContainer } from '@/app/style/commonStyles'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { CarpoolBoardMainList } from '@/features/board/ui/CarpoolBoardMainList'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const CarpoolBoard = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <FlexColumnContainer>
        <MainHeader secondary title="승차 공유" />
        <SearchBar />
        <ShowActivePostsButton />
        <CarpoolBoardMainList />
        <PostAdditionButton />
        <BottomNavigation />
      </FlexColumnContainer>
    </ActiveOnlyFilterStoreProvider>
  )
}
