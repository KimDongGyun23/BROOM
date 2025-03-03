import { FlexColumnContainer } from '@/app/style/commonStyles'
import { DateFilterStoreProvider } from '@/features/board/model/dateFilter.store'
import { BoardMainList } from '@/features/board/ui/BoardMainList'
import { PostAdditionButton } from '@/features/board/ui/PostAdditionButton'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { PostFilter } from '@/widgets/post-filter/ui/PostFilter'

export const Board = () => {
  return (
    <DateFilterStoreProvider>
      <RecruitingStoreProvider>
        <FlexColumnContainer>
          <MainHeader secondary title="승차 공유" />
          <SearchBar />
          <PostFilter />

          <BoardMainList />
          <PostAdditionButton />
          <BottomNavigation />
        </FlexColumnContainer>
      </RecruitingStoreProvider>
    </DateFilterStoreProvider>
  )
}
