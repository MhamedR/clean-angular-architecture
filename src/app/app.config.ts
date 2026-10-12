import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {KeycloakAuth} from './core/auth/keycloak-auth.service';
import {GlobalErrorHandler} from './core/error-handling/global-error-handler';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {errorInterceptor} from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAppInitializer(() => inject(KeycloakAuth).init()),
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
};
