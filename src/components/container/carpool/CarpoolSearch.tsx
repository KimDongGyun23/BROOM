import { SearchBar } from '@/components/domain/post/SearchBar'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Container } from '@/styles/commonStyles'

export const CarpoolSearch = () => {
  // const [searchParams] = useSearchParams()
  // const filterName = searchParams.get('filterName')
  // const searchName = searchParams.get('searchName')

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="carpool" />
      {/* <PostList isPending={isPending} isError={isError} /> */}
    </Container>
  )
}
