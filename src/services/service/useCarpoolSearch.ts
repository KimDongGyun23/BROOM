import { useCarpoolSearchList } from '@/services/query'
import { useFilterName, useSearchListActions } from '@/stores/carpoolSearchList'
import type { KebabMapType } from '@/types'
import { KEBAB_LIST } from '@/utils'

const SEARCH_OPTIONS: KebabMapType = [
  {
    label: '제목',
    type: 'text',
    placeholder: '제목을 입력해주세요.',
  },
  {
    label: '출발 장소',
    type: 'text',
    placeholder: '출발 장소를 입력해주세요.',
  },
]

export const useCarpoolSearch = (watchField: string) => {
  const filterName = useFilterName()
  const { changeFilterName, toggleFilterVisibility } = useSearchListActions()
  const { refetch } = useCarpoolSearchList({
    urls: {
      category: Object.keys(KEBAB_LIST).find(
        (key) => KEBAB_LIST[key as keyof typeof KEBAB_LIST] === filterName,
      ) as keyof typeof KEBAB_LIST,
      keyword: watchField,
    },
  })

  const selectedOption = SEARCH_OPTIONS.find((item) => item.label === filterName)
  const placeholder = selectedOption?.placeholder || '검색어를 입력해주세요.'

  const searchOptions = SEARCH_OPTIONS.map((item) => ({
    ...item,
    onClick: () => {
      changeFilterName(item.label)
      toggleFilterVisibility()
    },
  }))

  const handleSearch = () => refetch()

  return { placeholder, searchOptions, toggleFilterVisibility, handleSearch }
}
