import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '../services/keycloak.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  // Skip adding token for Keycloak endpoints
  if (req.url.includes('localhost:8181')) {
    return next(req);
  }

  // Add Authorization header if user is authenticated
  if (keycloakService.isLoggedIn()) {
    const token = keycloakService.getToken();
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    }
  }

  return next(req);
};
