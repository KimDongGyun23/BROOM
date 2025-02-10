import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { EmptyMessage } from '@/components/view/Error'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { usePostSearchData } from '@/services/service/usePostSearchData'
import { Container } from '@/styles/commonStyles'
import { ERROR_MESSAGES } from '@/utils/constants'

export const CarpoolSearch = () => {
  const { isPending, isError, hasNextPage, fetchNextPage, showActiveOnly, toggleShowActiveOnly } =
    usePostSearchData()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="carpool" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={toggleShowActiveOnly} />

      {isPending ? (
        <Loading />
      ) : isError ? (
        <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
      ) : (
        <PostList hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      )}
    </Container>
  )
}
