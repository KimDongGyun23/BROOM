import { styled } from 'styled-components'

import { FlexColumnContainer } from '@/app/style/commonStyles'
import { BoardMainList } from '@/features/post/board-main/ui/BoardMainList'
import { PostAdditionButton } from '@/features/post/board-main/ui/PostAdditionButton'
import { DateFilterForPost } from '@/features/post/search-post/ui/dateFilter/DateFilterForPost'
import { RecruitingFilterForPost } from '@/features/post/search-post/ui/recruitingFilter/RecruitingFilterForPost'
import { SearchBarForPost } from '@/features/post/search-post/ui/searchBar/SearchBarForPost'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Board = () => {
  return (
    <FlexColumnContainer>
      <MainHeader secondary title="승차 공유" />
      <SearchBarForPost />
      <FilterContainer>
        <DateFilterForPost />
        <RecruitingFilterForPost />
      </FilterContainer>

      <BoardMainList />
      <PostAdditionButton />
      <BottomNavigation />
    </FlexColumnContainer>
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
