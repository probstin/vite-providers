import { APP_ROLES } from "./main";
import { useAppRoles, usePermissions } from "./providers/AuthorizationProvider"

function App() {
  const roles = useAppRoles();

  return (
    <>
      <h1>
        Hello, world!
      </h1>
      <div>{JSON.stringify(roles)}</div>
      <div>User is an {usePermissions(APP_ROLES.ROLE_ADMIN) ? 'ADMIN' : '--'}</div>
    </>
  )
}

export default App
