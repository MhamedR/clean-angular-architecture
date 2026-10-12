import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {AppErrors} from '../error-handling/app-errors.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errors = inject(AppErrors);
  return next(req).pipe(
    catchError((error: unknown) => {
      errors.report(error);
      return throwError(() => error);
    }),
  );
};
