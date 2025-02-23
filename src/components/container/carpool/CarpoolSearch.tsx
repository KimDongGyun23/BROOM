import { Container } from '@/app/style/commonStyles'
import { CarpoolSearchList } from '@/components/domain/post/CarpoolSearchList'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { SearchBar } from '@/features/board/ui/SearchBar'
import { ShowActivePostsButton } from '@/features/board/ui/ShowActivePostsButton'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

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
