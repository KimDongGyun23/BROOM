import { Container } from '@/app/style/commonStyles'
import { CarpoolMainList } from '@/components/domain/post/CarpoolMainList'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { ShowActivePostsButton } from '@/components/domain/post/ShowActivePostsButton'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter'

export const CarpoolBoard = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <MainHeader />
        <SearchBar />
        <ShowActivePostsButton />
        <CarpoolMainList />
        <PostAdditionButton />
        <BottomNavigation />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
