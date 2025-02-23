import { Container } from '@/app/style/commonStyles'
import { CarpoolSearchList } from '@/components/domain/post/CarpoolSearchList'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'

export const CarpoolSearch = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="검색" />
        <SearchBar />
        <ShowActivePostsButton />
        <CarpoolSearchList />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
