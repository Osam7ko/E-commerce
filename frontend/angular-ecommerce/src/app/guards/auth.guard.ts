import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (keycloakService.isLoggedIn()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  sessionStorage.setItem('redirectUrl', state.url);

  // Redirect to login
  keycloakService.login();
  return false;
};
