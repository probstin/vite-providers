import { SYSTEM_ROLES } from "./main";
import { useCheckPermissions, useUserSystemRoles } from "./providers/AuthorizationProvider";

function App() {
  const userSystemRoles = useUserSystemRoles();

  return (
    <>
      <div>User System Roles: {JSON.stringify(userSystemRoles)}</div>
      {useCheckPermissions(SYSTEM_ROLES.ROLE_ADMIN) && <div>User is an ADMIN</div>}
      {useCheckPermissions(SYSTEM_ROLES.ROLE_DEVELOPER) && <div>User is a DEVELOPER</div>}
    </>
  )
}

export default App;
