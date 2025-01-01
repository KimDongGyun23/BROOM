import { useState } from 'react'

import { PostTabs, SubHeaderWithoutIcon } from '@/components/view'
import type { TabType } from '@/types'
import { getSessionStorageItem, setSessionStorageItem, TAB_LIST } from '@/utils'

export const Bookmark = () => {
  const storageName = `current-bookmark-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const handleClickTab = (tab: TabType) => {
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
