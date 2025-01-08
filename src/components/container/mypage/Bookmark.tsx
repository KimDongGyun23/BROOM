import { useState } from 'react'

import { PostTabs } from '@/components/domain/post/PostTabs'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import type { TabLabelType } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, setSessionStorageItem } from '@/utils/storage'

export const Bookmark = () => {
  const storageName = `current-bookmark-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LABELS[0]) as TabLabelType
  const [currentTab, setCurrentTab] = useState<TabLabelType>(initialTab)

  const handleClickTab = (tab: TabLabelType) => {
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  return (
    <main>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostTabs currentTab={currentTab} onTabClick={handleClickTab} />
    </main>
  )
}
