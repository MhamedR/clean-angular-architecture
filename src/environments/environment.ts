import {AppEnvironment} from './environment.model';

export const environment: AppEnvironment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  useMockApi: false,
  keycloak: {
    enabled: true,
    url: 'http://localhost:8080',
    realm: 'clean-architecture',
    clientId: 'angular-app',
  },
};
