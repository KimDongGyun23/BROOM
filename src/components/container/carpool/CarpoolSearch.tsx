import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { usePostSearchData } from '@/services/service/usePostSearchData'
import { Container } from '@/styles/commonStyles'

export const CarpoolSearch = () => {
  const { isPending, isError, hasNextPage, fetchNextPage, showActiveOnly, toggleShowActiveOnly } =
    usePostSearchData()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={toggleShowActiveOnly} />
      <PostList
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
