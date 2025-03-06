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

export type BusApplicant = {
  reservationId: number
  name: string
  studentId: string
  phoneNumber: string
}

export type BusApplicantListResponse = {
  result: BusApplicant[]
}

export type BusTotalApplicantCountResponse = {
  reservationCount: number
}

export type BusApplicationToggleResponse = {
  activated: boolean
}
