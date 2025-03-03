import { FlexColumnContainer } from '@/app/style/commonStyles'
import { BoardMainList } from '@/features/board/ui/BoardMainList'
import { PostAdditionButton } from '@/features/board/ui/PostAdditionButton'
import { DateTagStoreProvider } from '@/features/filter/model/dateTag.store'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { PostFilter } from '@/widgets/post-filter/ui/PostFilter'
import { PostSearchBar } from '@/widgets/post-search/ui/PostSearchBar'

export const Board = () => {
  return (
    <DateTagStoreProvider>
      <RecruitingStoreProvider>
        <FlexColumnContainer>
          <MainHeader secondary title="승차 공유" />
          <PostSearchBar />
          <PostFilter />

          <BoardMainList />
          <PostAdditionButton />
          <BottomNavigation />
        </FlexColumnContainer>
      </RecruitingStoreProvider>
    </DateTagStoreProvider>
  )
}
