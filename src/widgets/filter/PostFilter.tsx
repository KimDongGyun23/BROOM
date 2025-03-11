import styled from 'styled-components'

import { RecruitingButton } from '@/widgets/button/RecruitingButton'

import { PostDateFilter } from './PostDateFilter'

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
