import { FlexColumnContainer } from '@/app/style/commonStyles'
import { DateTagStoreProvider } from '@/features/filter/model/dateTag.store'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { PostAdditionButton } from '@/widgets/button/PostAdditionButton'
import { PostFilter } from '@/widgets/filter/PostFilter'
import { PostSearchBar } from '@/widgets/input-field/PostSearchBar'
import { BoardMainList } from '@/widgets/list/BoardMainList'

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
