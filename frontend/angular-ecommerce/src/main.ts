/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { KeycloakService } from './app/services/keycloak.service';

// Initialize Keycloak before bootstrapping the application
const keycloakService = new KeycloakService();

keycloakService
  .init()
  .then(() => {
    bootstrapApplication(App, appConfig).catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error('Failed to initialize Keycloak', error);
  });
