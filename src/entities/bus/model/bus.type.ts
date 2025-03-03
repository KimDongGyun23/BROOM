type BusPassenger = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

export type StudentId = Pick<BusPassenger, 'studentId'>
export type BusApplication = Omit<BusPassenger, 'reserved'>
export type ReservationStatus = Pick<BusPassenger, 'reserved'>

export type BusApplicationRequest = {
  body: BusApplication
}

export type BusApplicationInfoRequest = {
  urls: StudentId
}
