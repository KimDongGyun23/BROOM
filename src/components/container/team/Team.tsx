import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { useToggle } from '@/hooks/useToggle'
import { instance } from '@/services/query'
import { usePostList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { Container } from '@/styles/commonStyles'
import { TAB_KEYS, TAB_UPPER_KEYS } from '@/utils/constants'

const useFetchList = () => {
  const currentTab = TAB_UPPER_KEYS[1]
  const { setTab, setPost } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const {
    data: postList,
    isPending,
    isError,
  } = usePostList({ urls: { category: currentTab, isActive: showActiveOnly } })

  useEffect(() => {
    if (postList) {
      setTab(TAB_KEYS[1])
      setPost(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [postList, setPost, setTab, showActiveOnly])

  return {
    showActiveOnly,
    isPending,
    isError,
    toggleShowActiveOnly,
  }
}

export const Team = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()

  const { isPending, isError, showActiveOnly, toggleShowActiveOnly } = useFetchList()
  const handleAddTeamClick = () => navigate('/team/create')

  return (
    <Container>
      <MainHeader />
      <SearchBar currentTab="team" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={toggleShowActiveOnly} />

      <PostList isPending={isPending} isError={isError} />
      {session && <PostAdditionButton onClick={handleAddTeamClick} />}
      <BottomNavigation />
    </Container>
  )
}
