import styled from 'styled-components'

import { PostDateFilter } from '@/features/board/ui/PostDateFilter'
import { RecruitingButton } from '@/features/filter/ui/RecruitingButton'

export const PostFilter = () => (
  <Container>
    <PostDateFilter />
    <RecruitingButton />
  </Container>
)

const Container = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'space-between')}
    ${theme.margin(0, 'container')}
    ${theme.padding('sm', 0)}
    ${theme.border('divider', 'bottom')}
  `}
`
