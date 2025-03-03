type BusPassenger = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

type StudentId = Pick<BusPassenger, 'studentId'>
export type BusApplication = Omit<BusPassenger, 'reserved'>
export type ReservationStatus = Pick<BusPassenger, 'reserved'>

export type BusApplicationCheck = StudentId

export type BusApplicationRequest = {
  body: BusApplication
}

export type BusApplicationInfoRequest = {
  urls: StudentId
}
