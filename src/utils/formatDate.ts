import dayjs from 'dayjs'

import 'dayjs/locale/ko'

const DATE_FORMAT = {
  default: 'YYYY-MM-DD',
  compact: 'YYYYMMDD',
} as const

type DateFormatKey = keyof typeof DATE_FORMAT

type FormatDateFunction = (
  inputDate: Date | string,
  outputFormat: DateFormatKey,
  inputFormat?: DateFormatKey,
) => string

export const formatDate: FormatDateFunction = (
  inputDate,
  outputFormat = 'default',
  inputFormat,
) => {
  const targetFormat = DATE_FORMAT[outputFormat] || DATE_FORMAT.default
  const dateObject = inputFormat ? dayjs(inputDate, DATE_FORMAT[inputFormat]) : dayjs(inputDate)

  return dateObject.locale('ko').format(targetFormat)
}
