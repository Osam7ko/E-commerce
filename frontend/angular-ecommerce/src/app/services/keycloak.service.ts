import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../config/keycloak-config';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private static keycloakInstance: Keycloak;

  constructor() {
    if (!KeycloakService.keycloakInstance) {
      KeycloakService.keycloakInstance = new Keycloak(keycloakConfig);
    }
  }

  get keycloak(): Keycloak {
    return KeycloakService.keycloakInstance;
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await KeycloakService.keycloakInstance.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
      });

      if (authenticated) {
        console.log('User is authenticated');
        await this.loadUserProfile();
      }

      // Setup token refresh
      KeycloakService.keycloakInstance.onTokenExpired = () => {
        this.updateToken();
      };

      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization failed', error);
      return false;
    }
  }

  login(): void {
    KeycloakService.keycloakInstance.login({
      redirectUri: window.location.origin + '/products',
    });
  }

  logout(): void {
    KeycloakService.keycloakInstance.logout({
      redirectUri: window.location.origin + '/products',
    });
  }

  register(): void {
    KeycloakService.keycloakInstance.register({
      redirectUri: window.location.origin + '/products',
    });
  }

  isLoggedIn(): boolean {
    return !!KeycloakService.keycloakInstance.authenticated;
  }

  getToken(): string | undefined {
    return KeycloakService.keycloakInstance.token;
  }

  async updateToken(): Promise<boolean> {
    try {
      const refreshed = await KeycloakService.keycloakInstance.updateToken(30);
      if (refreshed) {
        console.log('Token refreshed');
      }
      return refreshed;
    } catch (error) {
      console.error('Failed to refresh token', error);
      return false;
    }
  }

  async loadUserProfile(): Promise<Keycloak.KeycloakProfile | null> {
    try {
      const profile = await KeycloakService.keycloakInstance.loadUserProfile();
      console.log('User profile loaded', profile);
      return profile;
    } catch (error) {
      console.error('Failed to load user profile', error);
      return null;
    }
  }

  getUserProfile(): Keycloak.KeycloakProfile | null {
    return KeycloakService.keycloakInstance.profile || null;
  }

  getUsername(): string {
    return (
      KeycloakService.keycloakInstance.tokenParsed?.['preferred_username'] || ''
    );
  }

  getUserEmail(): string {
    return KeycloakService.keycloakInstance.tokenParsed?.['email'] || '';
  }

  getUserFirstName(): string {
    return KeycloakService.keycloakInstance.tokenParsed?.['given_name'] || '';
  }

  getUserLastName(): string {
    return KeycloakService.keycloakInstance.tokenParsed?.['family_name'] || '';
  }

  getUserFullName(): string {
    return KeycloakService.keycloakInstance.tokenParsed?.['name'] || '';
  }

  hasRole(role: string): boolean {
    return KeycloakService.keycloakInstance.hasRealmRole(role);
  }

  getUserRoles(): string[] {
    return (
      KeycloakService.keycloakInstance.tokenParsed?.['realm_access']?.[
        'roles'
      ] || []
    );
  }
}
