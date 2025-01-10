type BusType = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

type StudentId = Pick<BusType, 'studentId'>
type NewBusForm = Omit<BusType, 'reserved'>
type ReservedInfo = Pick<BusType, 'reserved'>

export type BusFormType = NewBusForm
export type BusReservedInfo = StudentId

export type BusReserveRequest = {
  body: NewBusForm
}

export type BusReserveInfoRequest = {
  urls: StudentId
}

export type BusReserveInfoResponse = ReservedInfo
