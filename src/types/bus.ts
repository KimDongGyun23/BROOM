type BusPassenger = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

type StudentId = Pick<BusPassenger, 'studentId'>
type NewBusReservation = Omit<BusPassenger, 'reserved'>
export type ReservationStatus = Pick<BusPassenger, 'reserved'>

export type BusReservationForm = NewBusReservation
export type BusReservationCheck = StudentId

export type BusReservationRequest = {
  body: NewBusReservation
}

export type BusReservationInfoRequest = {
  urls: StudentId
}
