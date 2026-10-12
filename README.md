# Clean Angular Architecture

This repository is an Angular 22 application whose folder tree is the architecture. The aim is to show a clean architecture: every directory has one reason to change, and each layer can be read without opening the others.

## Why this architecture is clean

A screen, an API contract, and an authentication rule change for different reasons. This layout gives each of those changes a single home.

- A business change stays inside its feature. Users and products each own their pages, components, routes, and state. Understanding a feature means opening that feature folder.
- The HTTP contract stays inside `api/generated`. Pages and stores call those services. Replacing the client from `src/app/api/openapi.yaml` leaves the feature code in place.
- Application infrastructure stays inside `core`. Keycloak, route guards, HTTP interceptors, and the global error handler are registered once in `app.config.ts`. Feature code uses them. `core` does not import a feature.
- Reusable UI stays inside `shared`. A page header, a pipe, or a directive has no knowledge of users or products.
- The application shell stays inside `layout`. The header, sidebar, and main layout compose navigation and the router outlet. They do not load feature data.
- Feature state stays beside the feature that needs it. An NgRx Signal Store is added only when a page has state to coordinate, and the page provides that store. The store is created when the page opens and destroyed when the page closes.
- The application root only composes. `app.config.ts` registers global providers. `app.routes.ts` lazy-loads each feature. `app.component.ts` renders the router outlet.

The dependency direction follows that split. Features and the layout use `core`, `shared`, and `api/generated`. The root route table is the only file that loads a feature. Infrastructure and the generated client do not reach back into a feature.

## Responsibilities

| Block            | Responsibility                                                         |
| ---------------- | ---------------------------------------------------------------------- |
| `core/`          | Authentication, guards, interceptors, and global infrastructure.       |
| `shared/`        | Reusable components, directives, pipes, and utilities.                 |
| `layout/`        | Main layout, navigation, header, and sidebar.                          |
| `api/generated/` | API services and models generated from OpenAPI.                        |
| `features/`      | Business features, their pages, components, and state.                 |
| `store/`         | Feature state using NgRx Signal Store when state management is needed. |
| `app.config.ts`  | Global Angular providers and application configuration.                |
| `app.routes.ts`  | Root routes and lazy-loaded features.                                  |

## How a screen is served

1. `app.routes.ts` lazy-loads the feature route.
2. A guard from `core/guards` decides whether the route opens. With Keycloak disabled, the guard allows the route so the shell can run locally.
3. The page creates its Signal Store. The store calls the generated API service.
4. The auth interceptor attaches a bearer token to API requests. The error interceptor reports HTTP failures to the global error handler.
5. The page renders inside `layout`, using `shared` pieces such as the page header.

`ng serve` uses `src/environments/environment.development.ts`. That file turns on mock API data and leaves Keycloak disabled, so the users and products screens render without a backend. The production environment calls `http://localhost:8080/api` and enables Keycloak. Set `keycloak.enabled` to `true` in the development environment when a realm is available. Silent SSO uses `public/silent-check-sso.html`.

## Commands

```bash
npm start
npm run build
npm test
npm run format
```

`npm start` serves the app at `http://localhost:4200/`.

## Formatting

[Prettier](https://prettier.io/) formats the repository using `.prettierrc`. [Husky](https://typicode.github.io/husky/) runs Prettier on staged files before each commit through lint-staged, so committed code matches those rules. `npm run format` formats the whole project.
