import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {environment} from '../../../environments/environment';
import {KeycloakAuth} from '../auth/keycloak-auth.service';

export const authGuard: CanActivateFn = async () => {
  if (!environment.keycloak.enabled) {
    return true;
  }

  const auth = inject(KeycloakAuth);
  if (auth.authenticated()) {
    return true;
  }

  await auth.login();
  return false;
};
