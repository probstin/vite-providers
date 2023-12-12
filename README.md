
## `AuthorizationProvider`

### Basic Usage

#### 1. Add the `AuthorizationProvider` element to your `main|index.ts` file

```Typescript
// main|index.ts

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider> // required
      <AuthorizationProvider mode="client" configFileName="authorization.json">
        <App />
      </AuthorizationProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
)
```

### Props

### Hooks

```TypeScript
const userSystemRoles = useUserSystemRoles()
``` 
Returns a list the users resolved system roles (depending on the mode the provider is in `client | server`)

```TypeScript
const isUserAdmin = useCheckPermissions(SYSTEM_ROLES.ADMIN)
``` 
Returns a `boolean` indicating whether/not the authenticated user has the specified system role.

## `AuditProvider`

Send audits to the Audit Service automatically!

### Basic Usage

#### 1. Add the `AuditProvider` element to your `main|index.ts` file

```Typescript
// main|index.ts

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider> // required
      <AuthorizationProvider> // required
        <AuditProvider>
          <App />
        </AuditProvider>
      </AuthorizationProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
)
```

#### 2. Create an `audit.json` config file

The provider requires you to provide an `audit.json` file, stored in the `/public` directory of your React application.

The contents of this file define the hierarchy used to fulfill the Audit Service's role scheme in requst payloads. In other words, it's how we tell the Audit Service what level of permissions the logged in user has.

You only need to define what applies to your application. However, the keys in this object must be valid roles from the Audit Service: `admin | developer | normal | ...`

Create a `public/audit.json`

```json
{
  "roles": { 
    "admin": "<YOUR_ADMIN_SYSTEM_ROLE>", 
    "developer": "<YOUR_DEVELOPER_SYSTEM_ROLE>", 
    "normal": "<YOUR_USER_SYSTEM_ROLE>", 
  }
}
```

### Props

---

Made with :heart: by Probstin