import { FlexColumnContainer } from '@/app/style/commonStyles'
import { DateTagStoreProvider } from '@/features/filter/model/dateTag.store'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { PostAdditionButton } from '@/widgets/button/PostAdditionButton'
import { PostFilter } from '@/widgets/post-filter/PostFilter'
import { BoardMainList } from '@/widgets/post-list/ui/BoardMainList'
import { PostSearchBar } from '@/widgets/post-search/PostSearchBar'

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
