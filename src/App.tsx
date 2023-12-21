import Button from "@mui/material/Button";
import { SYSTEM_ROLES } from "./main";
import { useCheckPermissions, useUserSystemRoles } from "./providers/AuthorizationProvider";
import { useCustomTheme } from "./providers/CustomThemeProvider";
import { useEffect } from "react";
import { axiosInstances } from "./providers/AxiosProvider";

function App() {
  const { setActiveTheme } = useCustomTheme();
  const userSystemRoles = useUserSystemRoles();
  const primaryApi = axiosInstances['secondary'];

  useEffect(() => {
    primaryApi
      .get('employees')
      .then(res => console.log(res.data));
  }, []);

  return (
    <>
      <Button onClick={() => setActiveTheme('aTheme')}>
        Switch to A Theme
      </Button>
      <Button onClick={() => setActiveTheme('bTheme')}>
        Switch to B Theme
      </Button>
      <Button onClick={() => setActiveTheme('cTheme')}>
        Switch to C Theme
      </Button>
      <div>User System Roles: {JSON.stringify(userSystemRoles)}</div>
      {useCheckPermissions(SYSTEM_ROLES.ROLE_ADMIN) && <div>User is an ADMIN</div>}
      {useCheckPermissions(SYSTEM_ROLES.ROLE_DEVELOPER) && <div>User is a DEVELOPER</div>}
    </>
  )
}

export default App;
