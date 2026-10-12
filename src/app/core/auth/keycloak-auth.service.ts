import {Service, computed, inject, signal} from '@angular/core';
import Keycloak from 'keycloak-js';
import {environment} from '../../../environments/environment';
import {AppErrors} from '../error-handling/app-errors.service';
import {AuthSession} from './auth-session';

@Service()
export class KeycloakAuth {
  private readonly errors = inject(AppErrors);
  private readonly sessionState = signal<AuthSession | null>(null);
  private client: Keycloak | null = null;

  readonly enabled = environment.keycloak.enabled;
  readonly session = this.sessionState.asReadonly();
  readonly authenticated = computed(() => this.sessionState() !== null);

  init(): Promise<void> {
    if (!this.enabled) {
      return Promise.resolve();
    }

    const client = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });
    this.client = client;

    return client
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated) {
          this.captureSession(client);
        }
      })
      .catch((error: unknown) => {
        this.client = null;
        this.errors.report(error);
      });
  }

  login(): Promise<void> {
    const client = this.client;
    if (!client) {
      this.errors.report(new Error('Keycloak is not initialized'));
      return Promise.resolve();
    }
    return client.login();
  }

  logout(): Promise<void> {
    const client = this.client;
    if (!client) {
      return Promise.resolve();
    }
    return client.logout({redirectUri: window.location.origin});
  }

  hasRole(role: string): boolean {
    return this.client?.hasRealmRole(role) ?? false;
  }

  getValidToken(): Promise<string | null> {
    const client = this.client;
    if (!client?.authenticated) {
      return Promise.resolve(null);
    }
    return client.updateToken(30).then(() => client.token ?? null);
  }

  private captureSession(client: Keycloak): void {
    const parsed = client.tokenParsed;
    const username = readClaim(parsed, 'preferred_username');
    this.sessionState.set({
      username,
      name: readClaim(parsed, 'name') || username,
      roles: parsed?.realm_access?.roles ?? [],
    });
  }
}

function readClaim(parsed: Keycloak['tokenParsed'], claim: string): string {
  const value: unknown = parsed?.[claim];
  return typeof value === 'string' ? value : '';
}
