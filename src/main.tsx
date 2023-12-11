import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuditProvider from './providers/AuditProvider.tsx';
import { AuthorizationProvider } from './providers/AuthorizationProvider.tsx';

export enum APP_ROLES {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_DEVELOPER = "ROLE_DEVELOPER",
  ROLE_USER = "ROLE_USER",
}

// These would come from the AuthenticationProvider
const userRoles = ["USER_ROLE_1", "USER_ROLE_2"];

// These would come from the AuthorizationProvider
const systemRoles = ["ROLE_ADMIN", "ROLE_DEVELOPER"];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorizationProvider mode="server" endpoint='system-roles'>
      <AuditProvider roles={systemRoles}>
        <App />
      </AuditProvider>
    </AuthorizationProvider>
  </React.StrictMode>,
)
