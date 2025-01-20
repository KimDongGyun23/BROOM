import { useState } from 'react'

import { PostTabs } from '@/components/domain/post/PostTabs'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import type { TabLabel } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

export const Bookmark = () => {
  const initialTab = (getSessionStorageItem(SESSION_KEYS.BOOKMARK_TAB) || TAB_LABELS[0]) as TabLabel
  const [currentTab, setCurrentTab] = useState<TabLabel>(initialTab)

  const handleClickTab = (tab: TabLabel) => {
    setSessionStorageItem(SESSION_KEYS.BOOKMARK_TAB, tab)
    setCurrentTab(tab)
  }

  return (
    <main>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostTabs currentTab={currentTab} onTabClick={handleClickTab} />
    </main>
  )
}
