export const HttpErrorType = {
  USER: 'UserError',
  AUTH: 'AuthError',
  FORBIDDEN: 'ForbiddenError',
  CLIENT: 'ClientError',
  SERVER: 'ServerError',
  UNEXPECTED: 'UnexpectedError',
}

export const ErrorButtonLabels = {
  LOGIN: '로그인',
  REFRESH: '새로고침',
}

export function getErrorTypeFromStatusCode(statusCode?: number) {
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

export const getErrorMessage = (status: number) => {
  const errorType = getErrorTypeFromStatusCode(status)

  switch (errorType) {
    case HttpErrorType.USER:
      return {
        type: errorType,
        title: '잘못된 요청입니다.',
        content: '입력값을 확인해주세요.',
        buttonLabel: ErrorButtonLabels.REFRESH,
      }
    case HttpErrorType.AUTH:
      return {
        type: errorType,
        title: '로그인이 필요합니다.',
        content: '로그인 후 다시 시도해주세요.',
        buttonLabel: ErrorButtonLabels.LOGIN,
      }
    case HttpErrorType.FORBIDDEN:
      return {
        type: errorType,
        title: '접근 권한이 없습니다.',
        content: '관리자에게 문의해주세요.',
        buttonLabel: ErrorButtonLabels.REFRESH,
      }
    case HttpErrorType.CLIENT:
      if (status === 404) {
        return {
          type: errorType,
          title: '페이지를 찾을 수 없습니다.',
          content: '',
          buttonLabel: ErrorButtonLabels.REFRESH,
        }
      } else {
        return {
          type: errorType,
          title: '클라이언트 오류입니다.',
          content: '잠시 후 다시 시도해주세요.',
          buttonLabel: ErrorButtonLabels.REFRESH,
        }
      }
    case HttpErrorType.SERVER:
      return {
        type: errorType,
        title: '서버 오류입니다.',
        content: '잠시 후 다시 시도해주세요.',
        buttonLabel: ErrorButtonLabels.REFRESH,
      }
    case HttpErrorType.UNEXPECTED:
      return {
        type: errorType,
        title: '예기치 않은 오류입니다.',
        content: '잠시 후 다시 시도해주세요.',
        buttonLabel: ErrorButtonLabels.REFRESH,
      }
    default:
      return {
        title: '알 수 없는 오류입니다.',
        content: '잠시 후 다시 시도해주세요.',
        buttonLabel: ErrorButtonLabels.REFRESH,
      }
  }
}
