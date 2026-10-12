import {AppEnvironment} from './environment.model';

export const environment: AppEnvironment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  useMockApi: true,
  keycloak: {
    enabled: false,
    url: 'http://localhost:8080',
    realm: 'clean-architecture',
    clientId: 'angular-app',
  },
};
