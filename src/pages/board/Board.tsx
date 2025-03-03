import { FlexColumnContainer } from '@/app/style/commonStyles'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { DateFilterStoreProvider } from '@/features/board/model/dateFilter.store'
import { BoardMainList } from '@/features/board/ui/BoardMainList'
import { PostAdditionButton } from '@/features/board/ui/PostAdditionButton'
import { FilterContainer } from '@/features/board/ui/PostCommonStyle'
import { PostDateFilter } from '@/features/board/ui/PostDateFilter'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Board = () => {
  return (
    <DateFilterStoreProvider>
      <ActiveOnlyFilterStoreProvider>
        <FlexColumnContainer>
          <MainHeader secondary title="승차 공유" />
          <SearchBar />

          <FilterContainer>
            <PostDateFilter />
            <ShowActivePostsButton />
          </FilterContainer>

          <BoardMainList />
          <PostAdditionButton />
          <BottomNavigation />
        </FlexColumnContainer>
      </ActiveOnlyFilterStoreProvider>
    </DateFilterStoreProvider>
  )
}
