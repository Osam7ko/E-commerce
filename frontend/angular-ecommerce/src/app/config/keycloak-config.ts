import Keycloak from 'keycloak-js';

export const keycloakConfig: Keycloak.KeycloakConfig = {
  url: 'http://localhost:8181',
  realm: 'ecommerce',
  clientId: 'ecommerce-frontend',
};

export function initializeKeycloak(keycloak: Keycloak): () => Promise<boolean> {
  return () =>
    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    });
}
