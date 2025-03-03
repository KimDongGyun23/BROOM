import { Container } from '@/app/style/commonStyles'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { DateFilterStoreProvider } from '@/features/board/model/dateFilter.store'
import { FilterContainer } from '@/features/board/ui/PostCommonStyle'
import { PostDateFilter } from '@/features/board/ui/PostDateFilter'
import { PostSearchList } from '@/features/board/ui/PostSearchList'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { RecruitingButton } from '@/features/filter/ui/RecruitingButton'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostSearch = () => {
  return (
    <DateFilterStoreProvider>
      <RecruitingStoreProvider>
        <Container>
          <SubHeaderWithoutIcon type="null" title="검색" />
          <SearchBar />

          <FilterContainer>
            <PostDateFilter />
            <RecruitingButton />
          </FilterContainer>

          <PostSearchList />
        </Container>
      </RecruitingStoreProvider>
    </DateFilterStoreProvider>
  )
}
