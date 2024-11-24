import { retry, RetryConfig } from 'rxjs';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor = (config: RetryConfig) => {
  const interceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ) => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`),
      });
      return next(modifiedReq).pipe(retry(config));
    }
    return next(req);
  };

  return interceptor;
};
