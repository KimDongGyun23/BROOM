import { Container } from '@/app/style/commonStyles'
import { DateTagStoreProvider } from '@/features/filter/model/dateTag.store'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { PostFilter } from '@/widgets/filter/PostFilter'
import { PostSearchBar } from '@/widgets/input-field/PostSearchBar'
import { PostSearchList } from '@/widgets/list/PostSearchList'

export const PostSearch = () => {
  return (
    <DateTagStoreProvider>
      <RecruitingStoreProvider>
        <Container>
          <SubHeaderWithoutIcon type="null" title="검색" />
          <PostSearchBar />
          <PostFilter />

          <PostSearchList />
        </Container>
      </RecruitingStoreProvider>
    </DateTagStoreProvider>
  )
}
