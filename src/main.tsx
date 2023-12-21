import { ThemeOptions } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuditProvider from './providers/AuditProvider.tsx';
import { AuthenticationProvider } from './providers/AuthenticationProvider.tsx';
import { AuthorizationProvider } from './providers/AuthorizationProvider.tsx';
import { CustomThemeProvider } from './providers/CustomThemeProvider.tsx';
import AxiosProvider from './providers/AxiosProvider.tsx';

const aTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const bTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  }
};

const cTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#f50057',
    },
  },
}

const customThemes = { aTheme, bTheme, cTheme };

export enum SYSTEM_ROLES {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_DEVELOPER = "ROLE_DEVELOPER",
  ROLE_USER = "ROLE_USER",
}

const apiUrls = {
  primary: 'http://localhost:4500/',
  secondary: 'http://localhost:4500/',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <AuthorizationProvider mode="client" configFileName="authorization.json">
        <AuditProvider>
          <AxiosProvider apiUrls={apiUrls}>
            <CustomThemeProvider themes={customThemes}>
              <App />
            </CustomThemeProvider>
          </AxiosProvider>
        </AuditProvider>
      </AuthorizationProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
)
