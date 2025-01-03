import type { TabType } from '@/types'
import { TAB_LIST } from '@/utils'

type PostTabsProps = {
  currentTab: TabType
  onTabClick: (tab: TabType) => void
}

export const PostTabs = ({ currentTab, onTabClick }: PostTabsProps) => {
  return (
    <ul className="p-medium flex px-4 py-3 font-medium">
      {TAB_LIST.map((tab) => {
        const tabStyle =
          currentTab === tab
            ? 'text-blue-6 border-b-[2px] border-b-blue-5'
            : 'text-grey-6 border-b-[2px] border-b-grey-2'

        return (
          <li>
            <button key={tab} className={`grow pb-3 ${tabStyle}`} onClick={() => onTabClick(tab)}>
              {tab}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
