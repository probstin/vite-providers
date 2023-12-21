import Button from "@mui/material/Button";
import { SYSTEM_ROLES } from "./main";
import { useCheckPermissions, useUserSystemRoles } from "./providers/AuthorizationProvider";
import { useCustomTheme } from "./providers/CustomThemeProvider";
import { useAxios } from "./providers/AxiosProvider";
import { useEffect } from "react";

function App() {
  const userSystemRoles = useUserSystemRoles();
  const { setActiveTheme } = useCustomTheme();
  const primaryApi = useAxios('primary');

  useEffect(() => {
    primaryApi.get('employees').then(res => console.log(res.data));
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
