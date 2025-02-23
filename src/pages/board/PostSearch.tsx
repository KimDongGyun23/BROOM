import { Container } from '@/app/style/commonStyles'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { PostSearchList } from '@/features/board/ui/PostSearchList'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const PostSearch = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="검색" />
        <SearchBar />
        <ShowActivePostsButton />
        <PostSearchList />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
