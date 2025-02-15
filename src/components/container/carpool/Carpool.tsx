import { CarpoolMainList } from '@/components/domain/post/CarpoolMainList'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { ShowActivePostsButton } from '@/components/domain/post/ShowActivePostsButton'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { ActiveOnlyFilterStoreProvider } from '@/stores/activeOnlyFilter'
import { Container } from '@/styles/commonStyles'

export const Carpool = () => {
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
