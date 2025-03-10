export const enum HttpErrorType {
  USER = 'UserError',
  AUTH = 'AuthError',
  FORBIDDEN = 'ForbiddenError',
  CLIENT = 'ClientError',
  SERVER = 'ServerError',
  UNEXPECTED = 'UnexpectedError',
}

export type HttpErrorInfo<E = unknown> = {
  type: HttpErrorType
  statusCode?: number
  detail?: E
  meta?: unknown
}

export class HttpError<E = unknown> extends Error {
  private _type: HttpErrorType
  private _statusCode?: number
  private _detail?: E
  private _meta: unknown

  constructor({ type, statusCode, detail, meta }: HttpErrorInfo<E>) {
    const generalMessage = `${type}`
    super(generalMessage)

    this._type = type
    this._statusCode = statusCode
    this._detail = detail
    this._meta = meta
  }

  get type() {
    return this._type
  }

  get statusCode() {
    return this._statusCode
  }

  get detail() {
    return this._detail
  }

  get meta() {
    return this._meta
  }

  printAll(...args: unknown[]) {
    console.error(...args, this.message, {
      type: this._type,
      statusCode: this._statusCode,
      detail: this._detail,
      meta: this._meta,
    })
  }
}
