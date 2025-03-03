import { Container } from '@/app/style/commonStyles'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { DateFilterStoreProvider } from '@/features/board/model/dateFilter.store'
import { FilterContainer } from '@/features/board/ui/PostCommonStyle'
import { PostDateFilter } from '@/features/board/ui/PostDateFilter'
import { PostSearchList } from '@/features/board/ui/PostSearchList'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostSearch = () => {
  return (
    <DateFilterStoreProvider>
      <ActiveOnlyFilterStoreProvider>
        <Container>
          <SubHeaderWithoutIcon type="null" title="검색" />
          <SearchBar />

          <FilterContainer>
            <PostDateFilter />
            <ShowActivePostsButton />
          </FilterContainer>

          <PostSearchList />
        </Container>
      </ActiveOnlyFilterStoreProvider>
    </DateFilterStoreProvider>
  )
}
