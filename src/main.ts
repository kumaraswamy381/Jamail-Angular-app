import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './app/core/interceptors/http-error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, FormsModule),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
}).catch((err) => console.error(err));
