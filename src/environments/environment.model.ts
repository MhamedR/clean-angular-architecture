export interface KeycloakEnvironment {
  enabled: boolean;
  url: string;
  realm: string;
  clientId: string;
}

export interface AppEnvironment {
  production: boolean;
  apiUrl: string;
  useMockApi: boolean;
  keycloak: KeycloakEnvironment;
}
