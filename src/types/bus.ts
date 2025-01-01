type BusType = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

export type BusFormType = Omit<BusType, 'reserved'>
export type BusInfoFormType = Pick<BusType, 'studentId'>

export type BusReserveRequest = {
  body: Omit<BusType, 'reserved'>
}

export type BusReserveInfoRequest = {
  urls: Pick<BusType, 'studentId'>
}

export type BusReserveInfoResponse = Pick<BusType, 'reserved'>
