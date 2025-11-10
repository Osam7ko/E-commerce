import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-status.html',
  styleUrl: './login-status.css',
})
export class LoginStatus implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';
  userEmail: string = '';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.keycloakService.isLoggedIn();

    if (this.isAuthenticated) {
      this.userFullName = this.keycloakService.getUserFullName();
      this.userEmail = this.keycloakService.getUserEmail();
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  register(): void {
    this.keycloakService.register();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
