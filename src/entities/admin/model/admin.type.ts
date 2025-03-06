export type TrainingSchedule = {
  id: number
  trainingDate: string
}

export type TrainingScheduleListResponse = {
  dates: TrainingSchedule[]
}

export type CreateTrainingScheduleRequest = {
  body: Pick<TrainingSchedule, 'trainingDate'>
}
export type CreateTrainingScheduleResponse = TrainingSchedule

export type DeleteTrainingScheduleRequest = {
  urls: Pick<TrainingSchedule, 'id'>
}
