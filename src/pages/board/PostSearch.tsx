import { Container } from '@/app/style/commonStyles'
import { PostSearchList } from '@/features/board/ui/PostSearchList'
import { DateTagStoreProvider } from '@/features/filter/model/dateTag.store'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { PostFilter } from '@/widgets/post-filter/ui/PostFilter'

export const PostSearch = () => {
  return (
    <DateTagStoreProvider>
      <RecruitingStoreProvider>
        <Container>
          <SubHeaderWithoutIcon type="null" title="검색" />
          <SearchBar />
          <PostFilter />
          <PostSearchList />
        </Container>
      </RecruitingStoreProvider>
    </DateTagStoreProvider>
  )
}
