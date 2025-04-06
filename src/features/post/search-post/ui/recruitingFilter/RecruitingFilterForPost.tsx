import {
  usePostRecruitingActions,
  usePostRecruitingState,
} from '../../model/recruitingFilter.store'

import { RecruitingFilter } from './RecruitingFilter'

export const RecruitingFilterForPost = () => {
  const isRecruiting = usePostRecruitingState()
  const { toggleRecruiting } = usePostRecruitingActions()

  return <RecruitingFilter isRecruiting={isRecruiting} toggleRecruiting={toggleRecruiting} />
}
