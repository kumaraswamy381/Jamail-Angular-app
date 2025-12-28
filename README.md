# AngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Frontend Integration (Angular)

✅ The Angular app now integrates with the backend endpoints for labourers. Key points:

- The API base URL is configured via `src/environments/environment.ts` (`apiBaseUrl`). Update it for production or deployment.
- `LabourService` uses the backend endpoints:
  - POST `${apiBaseUrl}/api/labourers/register`
  - GET `${apiBaseUrl}/api/labourers/all/labours`
  - GET `${apiBaseUrl}/api/labourers/phone/{phoneNumber}`
  - DELETE `${apiBaseUrl}/api/labourers/{id}`
  - DELETE `${apiBaseUrl}/api/labourers/phone/{phoneNumber}`

- A global HTTP interceptor (`src/app/core/interceptors/http-error.interceptor.ts`) adds an Authorization header if `localStorage.auth_token` is present and maps backend errors to user-friendly messages.

### Security & Production notes

- Enable CORS on the backend for the Angular origin, e.g. in Spring Boot add `@CrossOrigin(origins = "http://localhost:4200")` on controller or use `WebMvcConfigurer`.
- Use HTTPS in production and set `environment.prod.ts` `apiBaseUrl` to your secured API hostname.
- Don't store long-lived tokens in localStorage in real applications—use secure, HttpOnly cookies where possible.

### Local development

- Start backend (port 9640 expected by default).
- Start Angular dev server:

  npm install
  npm run start

### Files changed

- `src/app/core/service/labour.service.ts` (now uses `environment.apiBaseUrl` and fixed delete endpoints)
- `src/app/core/interceptors/http-error.interceptor.ts` (global HTTP error handler + auth header)
- `src/app/features/labour/labour-form` converted to reactive forms with validation
- `src/app/features/labour/labour-list` added search by phone and confirm deletes
- `src/environments/environment.ts` and `environment.prod.ts` added


