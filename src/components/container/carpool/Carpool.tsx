import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { InfiniteData } from '@tanstack/react-query'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { useToggle } from '@/hooks/useToggle'
import { instance } from '@/services/query'
import { useActivePostList, usePostList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { Container } from '@/styles/commonStyles'
import type { PostResponse } from '@/types/post'
import { TAB_UPPER_KEYS } from '@/utils/constants'

const useCarpoolData = () => {
  const currentTab = TAB_UPPER_KEYS[0]
  const { setTab, setPost } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const {
    data: allCarpools,
    isPending: allPending,
    isError: allError,
  } = usePostList({ urls: { category: currentTab } })

  const {
    data: activeCarpools,
    refetch: refetchActiveCarpools,
    isPending: activePending,
    isError: activeError,
  } = useActivePostList({ urls: { category: currentTab } })

  const mapInfiniteDataToPosts = (data: InfiniteData<PostResponse> | undefined) => {
    if (!data) return []
    return data.pages.flatMap((page) => page.result)
  }

  const handleRecruitToggle = () => {
    refetchActiveCarpools()
    toggleShowActiveOnly()
  }

  useEffect(() => {
    if (activeCarpools || allCarpools) {
      setTab('carpool')
      setPost(
        showActiveOnly
          ? mapInfiniteDataToPosts(activeCarpools)
          : mapInfiniteDataToPosts(allCarpools),
      )
    }
  }, [activeCarpools, allCarpools, setPost, setTab, showActiveOnly])

  return {
    showActiveOnly,
    isPending: allPending || activePending,
    isError: allError || activeError,
    handleRecruitToggle,
  }
}

export const Carpool = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()

  const { showActiveOnly, isPending, isError, handleRecruitToggle } = useCarpoolData()
  const handleAddCarpoolClick = () => navigate('/carpool/create')

  return (
    <Container>
      <MainHeader />
      <SearchBar currentTab="carpool" />
      <PostActiveToggle isChecked={showActiveOnly} onToggle={handleRecruitToggle} />

      <PostList isPending={isPending} isError={isError} />
      {session && <PostAdditionButton onClick={handleAddCarpoolClick} />}
      <BottomNavigation />
    </Container>
  )
}
