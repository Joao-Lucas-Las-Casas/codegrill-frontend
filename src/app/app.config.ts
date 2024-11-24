import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {routes} from './app.routes';
import {registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import {authInterceptor} from './interceptor/auth.interceptor';
import {provideEnvironmentNgxMask} from 'ngx-mask';

export function tokenGetter() {
  return localStorage.getItem('token');
}


registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    provideHttpClient(withInterceptors([authInterceptor({count: 2, delay: 2000})]), withInterceptorsFromDi()),
    provideEnvironmentNgxMask(),
    importProvidersFrom([
      BrowserAnimationsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      }),
    ]),
    provideAnimations()
  ]
};
