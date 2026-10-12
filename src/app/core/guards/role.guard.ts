import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {KeycloakAuth} from '../auth/keycloak-auth.service';

export function roleGuard(role: string): CanActivateFn {
  return () => {
    if (!environment.keycloak.enabled) {
      return true;
    }

    const auth = inject(KeycloakAuth);
    if (auth.hasRole(role)) {
      return true;
    }

    return inject(Router).createUrlTree(['/users']);
  };
}
