export type TrainingDate = {
  id: number
  trainingDate: string
}

export type TrainingDateListResponse = {
  dates: TrainingDate[]
}

export type AddTrainingDateRequest = {
  body: Pick<TrainingDate, 'trainingDate'>
}
export type AddTrainingDateResponse = TrainingDate

export type RemoveTrainingDateRequest = {
  urls: Pick<TrainingDate, 'id'>
}

export type BusApplicationToggleResponse = {
  activated: boolean
}

export type PostCountResponse = {
  boardCount: number
}

export type UserCountResponse = {
  userCount: number
}
