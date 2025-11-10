# Keycloak Integration Guide

## Overview

This document describes the Keycloak authentication integration implemented in the Angular e-commerce application.

## Configuration

### Keycloak Server Details

- **URL**: http://localhost:8181
- **Realm**: ecommerce
- **Frontend Client ID**: ecommerce-frontend
- **Backend Client ID**: ecommerce-backend (Confidential client)

## Features Implemented

### 1. Authentication Service (`src/app/services/keycloak.service.ts`)

- Keycloak initialization with PKCE flow
- Login/Logout/Register methods
- Token management and auto-refresh
- User profile loading
- Helper methods to get user information (firstName, lastName, email, etc.)

### 2. Route Protection (`src/app/guards/auth.guard.ts`)

- Protects routes requiring authentication
- Redirects unauthenticated users to Keycloak login
- Stores attempted URL for post-login redirect

### 3. HTTP Interceptor (`src/app/interceptors/auth.interceptor.ts`)

- Automatically adds Bearer token to API requests
- Skips token for Keycloak server requests

### 4. Login Status Component (`src/app/components/login-status/`)

- Displays Login/Register buttons when not authenticated
- Shows user profile dropdown when authenticated
- Logout functionality

### 5. Checkout Form Auto-fill

- Automatically populates customer information from Keycloak profile
- Pre-fills firstName, lastName, and email fields

## Protected Routes

- `/checkout` - Requires authentication

## Files Created/Modified

### New Files:

1. `src/app/config/keycloak-config.ts` - Keycloak configuration
2. `src/app/services/keycloak.service.ts` - Keycloak service wrapper
3. `src/app/guards/auth.guard.ts` - Route guard
4. `src/app/interceptors/auth.interceptor.ts` - HTTP interceptor
5. `src/app/components/login-status/` - Login status component
6. `public/assets/silent-check-sso.html` - Silent SSO check page

### Modified Files:

1. `src/main.ts` - Initialize Keycloak before app bootstrap
2. `src/app/app.config.ts` - Register HTTP interceptor
3. `src/app/app.routes.ts` - Add auth guard to protected routes
4. `src/app/app.ts` - Import LoginStatus component
5. `src/app/app.html` - Add login status to header
6. `src/app/components/checkout/checkout.ts` - Auto-fill user data

## How It Works

### 1. Application Startup

- Keycloak initializes before Angular app bootstraps
- Uses 'check-sso' mode (doesn't force login on startup)
- Supports silent SSO check

### 2. User Authentication Flow

1. User clicks "Login" button
2. Redirected to Keycloak login page
3. After successful login, redirected back to application
4. Token stored in memory (not localStorage for security)
5. User profile loaded automatically

### 3. Protected Route Access

1. User tries to access `/checkout`
2. Auth guard checks if user is authenticated
3. If not authenticated, redirects to Keycloak login
4. After login, user is redirected back to `/checkout`

### 4. API Requests

1. HTTP interceptor automatically adds `Authorization: Bearer <token>` header
2. Token refreshed automatically when expired
3. Backend validates token with Keycloak

### 5. Checkout Form

1. When authenticated user visits checkout
2. Form automatically populated with:
   - First Name from Keycloak
   - Last Name from Keycloak
   - Email from Keycloak

## Security Features

1. **PKCE Flow**: Uses Proof Key for Code Exchange for enhanced security
2. **Token in Memory**: Tokens stored in memory, not localStorage
3. **Auto Token Refresh**: Tokens refreshed automatically before expiration
4. **Silent SSO**: Supports silent single sign-on check
5. **Route Protection**: Sensitive routes protected by auth guard

## Testing

### Prerequisites

1. Keycloak server running at http://localhost:8181
2. Realm 'ecommerce' configured
3. Client 'ecommerce-frontend' configured as public client
4. Client 'ecommerce-backend' configured as confidential client

### Test Scenarios

1. **Browse Without Login**

   - Navigate to products page
   - Should work without authentication

2. **Protected Route Access**

   - Try to access `/checkout` without login
   - Should redirect to Keycloak login

3. **Login Flow**

   - Click "Login" button
   - Complete Keycloak login
   - Should redirect back to application
   - User name should appear in header

4. **Checkout Auto-fill**

   - Login to application
   - Navigate to checkout
   - Customer fields should be pre-filled

5. **Logout**
   - Click user dropdown
   - Click "Logout"
   - Should redirect to Keycloak logout
   - Then back to products page

## Troubleshooting

### Issue: Keycloak not initializing

- Check Keycloak server is running at http://localhost:8181
- Verify realm name is 'ecommerce'
- Check client ID is 'ecommerce-frontend'

### Issue: Token not added to requests

- Check HTTP interceptor is registered in app.config.ts
- Verify user is authenticated
- Check browser console for errors

### Issue: Redirect loop

- Clear browser cache and cookies
- Check Keycloak client configuration
- Verify redirect URIs are configured correctly

## Next Steps

1. Configure Keycloak realm and clients
2. Test authentication flow
3. Verify token is sent to backend
4. Test protected routes
5. Verify checkout form auto-fill

## Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [keycloak-js Documentation](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter)
- [Angular Security Best Practices](https://angular.io/guide/security)
