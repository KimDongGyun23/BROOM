import styled from 'styled-components'

import { ProfileImage } from '@/shared/ui/ProfileImage'

import { usePostContent } from '../model/postDetail.store'

export const PostDetailProfile = () => {
  const post = usePostContent()

  if (!post || !post.author) return null

  const { militaryBranch, nickname, reserveYear } = post.author

  return (
    <Container>
      <ProfileImage iconType={militaryBranch} size="lg" />
      <ProfileInfo>
        <NameSubtitleContainer>
          <span className="profile-name">{nickname}</span>
          <span className="profile-subtitle">예비군 {reserveYear}년차</span>
        </NameSubtitleContainer>
        <p className="profile-description">{post.status.createdAt}</p>
      </ProfileInfo>
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', undefined, 'lg')};
    ${theme.margin(0, 'container')};
    ${theme.padding(0, 0, 'lg')};
    ${theme.border('divider', 'bottom')};
  `}
`

const ProfileInfo = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')};

  .profile-description {
    ${({ theme }) => theme.font(800, theme.colors.black[400])};
  }
`

const NameSubtitleContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};

  .profile-name {
    ${({ theme }) => theme.font(600, theme.colors.black[600])};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .profile-subtitle {
    ${({ theme }) => theme.font(800, theme.colors.blue[500])};
    flex-shrink: 0;
  }
`
