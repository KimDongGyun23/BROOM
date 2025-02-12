import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { Container } from '@/styles/commonStyles'

export const Carpool = () => {
  return (
    <Container>
      <MainHeader />
      <SearchBar />

      <main>
        <PostActiveToggle />
        <PostList />
      </main>

      <PostAdditionButton />
      <BottomNavigation />
    </Container>
  )
}
