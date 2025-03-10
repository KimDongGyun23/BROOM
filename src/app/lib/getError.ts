import { HttpError, HttpErrorType } from '../api/HttpError'

export const getErrorTypeFromStatusCode = (statusCode?: number) => {
  if (!statusCode) {
    return HttpErrorType.UNEXPECTED
  }

  if (statusCode < 500) {
    switch (statusCode) {
      case 400:
        return HttpErrorType.USER
      case 401:
        return HttpErrorType.AUTH
      case 403:
        return HttpErrorType.FORBIDDEN
      default:
        return HttpErrorType.CLIENT
    }
  }

  return HttpErrorType.SERVER
}
export const getHttpError = <D = unknown>(detail?: D, statusCode?: number, meta?: unknown) => {
  return new HttpError({
    type: getErrorTypeFromStatusCode(statusCode),
    detail,
    statusCode,
    meta,
  })
}

export const isHttpError = <E = unknown>(error: unknown): error is HttpError<E> => {
  return error instanceof HttpError
}
