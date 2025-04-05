import { usePostDateTag, usePostDateTagActions } from '../../model/dateTag.store'

import { DateFilter } from './DateFilter'

export const DateFilterForPost = () => {
  const selectedDate = usePostDateTag()

  const { setDateTag } = usePostDateTagActions()

  const isDateSelected = (date: string) => selectedDate === date
  const handleDateToggle = (date: string) => setDateTag(isDateSelected(date) ? null : date)

  return <DateFilter isDateSelected={isDateSelected} onDateToggle={handleDateToggle} />
}
