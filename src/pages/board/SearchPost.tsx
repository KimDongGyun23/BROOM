import { styled } from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { DateFilterForSearch } from '@/features/search-post/ui/dateFilter/DateFilterForSearch'
import { PostSearchList } from '@/features/search-post/ui/PostSearchList'
import { RecruitingFilterForSearch } from '@/features/search-post/ui/recruitingFilter/RecruitingFilterForSearch'
import { SearchBarForSearch } from '@/features/search-post/ui/searchBar/SearchBarForSearch'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const SearchPost = () => {
  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBarForSearch />
      <FilterContainer>
        <DateFilterForSearch />
        <RecruitingFilterForSearch />
      </FilterContainer>

      <PostSearchList />
    </Container>
  )
}

const FilterContainer = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'space-between')}
    ${theme.margin(0, 'container')}
    ${theme.padding('sm', 0)}
    ${theme.border('divider', 'bottom')}
  `}
`
