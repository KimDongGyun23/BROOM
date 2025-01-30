import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import 'dayjs/locale/ko'

dayjs.extend(customParseFormat)

const DATE_FORMAT = {
  default: 'YYYY-MM-DD',
  compact: 'YYYYMMDD',
  dateTime: 'YYYY/MM/DD HH:mm',
  fullTime: 'HH:mm:ss',
  shortTime: 'HH:mm',
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
