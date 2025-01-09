import type { TabLabel } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'

type PostTabsProps = {
  currentTab: TabLabel
  onTabClick: (tab: TabLabel) => void
}

export const PostTabs = ({ currentTab, onTabClick }: PostTabsProps) => {
  return (
    <ul className="p-medium flex px-4 py-3 font-medium">
      {TAB_LABELS.map((tab) => {
        const tabStyle =
          currentTab === tab
            ? 'text-blue-600 border-b-[2px] border-b-blue-500'
            : 'text-grey-600 border-b-[2px] border-b-grey-200'

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
