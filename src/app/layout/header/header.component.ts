import {Component, inject} from '@angular/core';
import {AppErrors} from '../../core/error-handling/app-errors.service';
import {KeycloakAuth} from '../../core/auth/keycloak-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  protected readonly auth = inject(KeycloakAuth);
  private readonly errors = inject(AppErrors);

  protected signIn(): void {
    void this.auth.login();
  }

  protected signOut(): void {
    void this.auth.logout().catch((error: unknown) => this.errors.report(error));
  }
}
