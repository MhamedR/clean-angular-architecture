import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {from, switchMap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {KeycloakAuth} from '../auth/keycloak-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const auth = inject(KeycloakAuth);
  return from(auth.getValidToken()).pipe(
    switchMap((token) => {
      const authorized = token ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : req;
      return next(authorized);
    }),
  );
};
