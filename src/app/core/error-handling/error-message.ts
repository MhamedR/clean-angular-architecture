import {HttpErrorResponse} from '@angular/common/http';

export function errorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const payload: unknown = error.error;
    if (typeof payload === 'string' && payload.trim()) {
      return payload;
    }
    if (isMessagePayload(payload)) {
      return payload.message;
    }
    return error.status
      ? `Request failed (${error.status} ${error.statusText})`
      : 'Network request failed';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong';
}

function isMessagePayload(payload: unknown): payload is {message: string} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    typeof payload.message === 'string' &&
    payload.message.trim().length > 0
  );
}
