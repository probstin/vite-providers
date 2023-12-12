import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuditProvider from './providers/AuditProvider.tsx';
import { AuthorizationProvider } from './providers/AuthorizationProvider.tsx';
import { AuthenticationProvider } from './providers/AuthenticationProvider.tsx';

export enum SYSTEM_ROLES {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_DEVELOPER = "ROLE_DEVELOPER",
  ROLE_USER = "ROLE_USER",
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <AuthorizationProvider mode="client" configFileName="authorization.json">
        <AuditProvider>
          <App />
        </AuditProvider>
      </AuthorizationProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
)
