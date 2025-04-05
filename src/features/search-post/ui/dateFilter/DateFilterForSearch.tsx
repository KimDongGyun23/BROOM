import {
  useSearchPostDateTag,
  useSearchPostDateTagActions,
} from '@/features/search-post/model/dateTag.store'

import { DateFilter } from './DateFilter'

export const DateFilterForSearch = () => {
  const selectedDate = useSearchPostDateTag()

  const { setDateTag } = useSearchPostDateTagActions()

  const isDateSelected = (date: string) => selectedDate === date
  const handleDateToggle = (date: string) => setDateTag(isDateSelected(date) ? null : date)

  return <DateFilter isDateSelected={isDateSelected} onDateToggle={handleDateToggle} />
}
