import { PostTabs } from '@/components/domain/post/PostTabs'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { PostTabStoreProvider } from '@/stores/postTab'

export const Bookmark = () => {
  return (
    <PostTabStoreProvider>
      <main>
        <SubHeaderWithoutIcon type="null" title="북마크" />
        <PostTabs />
      </main>
    </PostTabStoreProvider>
  )
}
