import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add any default headers (e.g., auth token) if available
    const token = localStorage.getItem('auth_token');
    let cloned = req;

    if (token) {
      cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        let userMessage = 'An unexpected error occurred.';

        if (error.error && typeof error.error === 'string') {
          userMessage = error.error;
        } else if (error.error && error.error.error) {
          userMessage = error.error.error;
        } else if (error.message) {
          userMessage = error.message;
        }

        // Handle auth errors centrally
        if (error.status === 401 || error.status === 403) {
          // Optionally redirect to login
          userMessage = 'Authentication error. Please login again.';
          // localStorage.removeItem('auth_token');
        }

        // For production, consider logging the error to remote logging infrastructure
        return throwError(() => ({ status: error.status, message: userMessage }));
      })
    );
  }
}
