import { Container } from '@/app/style/commonStyles'
import { CarpoolSearchList } from '@/components/domain/post/CarpoolSearchList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { ShowActivePostsButton } from '@/components/domain/post/ShowActivePostsButton'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter'

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
