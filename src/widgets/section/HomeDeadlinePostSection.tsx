import styled from 'styled-components'

import { useFetchDeadLinePostList } from '@/entities/board/api/useBoard.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { Tooltip } from '@/shared/ui/Tooltip'

import { PostItem } from '../list/item/PostItem'

const SectionContent = () => {
  const { data } = useFetchDeadLinePostList()

  const postList = data?.result || []

  if (!postList || !postList.length) return <EmptyMessage label={ERROR_MESSAGES.NO_POST} />

  return (
    <>
      {postList.map((item) => (
        <PostItem key={item.status.boardId} item={item} />
      ))}
    </>
  )
}

export const HomeDeadlinePostSection = () => {
  return (
    <SectionLayout>
      <Header>
        <h4 className="title">마감 임박</h4>
        <Tooltip message={`최근 7일 내에 작성된 게시글 중\r\n모집 마감이 임박한 게시글`} />
      </Header>

      <SectionContent />
    </SectionLayout>
  )
}

const SectionLayout = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'xl')}
    ${theme.padding('lg')}
    ${theme.boxShadow('sm')}
  `}
  background-color: white;
`

const Header = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')}

  .title {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
  }
`
