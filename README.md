## `AuditProvider`

Send audits to the Audit Service automatically!

### 1. Use the `AuditProvider` element

```Typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuditProvider roles={userRoles}>
      <App />
    </AuditProvider>
  </React.StrictMode>,
)
```

### 2. Create an `audit.json` config file

The provider requires you to provide an `audit.json` file, stored in the `/public` directory of your React application.

The contents of this file define the hierarchy used to fulfill the Audit Service's role scheme.

You only need to define what applies to your application. However, the keys in this object must be valid roles from the Audit Service: `admin | developer | normal | ...`

`public/audit.json`

```json
{
  "roles": { 
    "admin": "<YOUR_ADMIN_SYSTEM_ROLE>", 
    "developer": "<YOUR_DEVELOPER_SYSTEM_ROLE>", 
    "normal": "<YOUR_USER_SYSTEM_ROLE>", 
  }
}
```