import {
  useSearchRecruitingActions,
  useSearchRecruitingState,
} from '../../model/recruitingFilter.store'

import { RecruitingFilter } from './RecruitingFilter'

export const RecruitingFilterForSearch = () => {
  const isRecruiting = useSearchRecruitingState()
  const { toggleRecruiting } = useSearchRecruitingActions()

  return <RecruitingFilter isRecruiting={isRecruiting} toggleRecruiting={toggleRecruiting} />
}
