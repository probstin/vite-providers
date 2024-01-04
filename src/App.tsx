import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import ActiveFolderDisplay from "./components/ActiveFolderDisplay";
import FolderSelector from "./components/FolderSelector";
import { SYSTEM_ROLES } from "./main";
import { useCheckPermissions, useUserSystemRoles } from "./providers/AuthorizationProvider";
import { axiosInstances } from "./providers/AxiosProvider";
import { useCustomTheme } from "./providers/CustomThemeProvider";
import { useAuthorizedFolders } from "./providers/FolderProvider";

function App() {
  const { setActiveTheme } = useCustomTheme();
  const userSystemRoles = useUserSystemRoles();
  const primaryApi = axiosInstances['secondary'];
  const authorizedFolders = useAuthorizedFolders();

  useEffect(() => {
    primaryApi
      .get('employees')
      .then(res => console.log(res.data));
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button onClick={() => setActiveTheme('aTheme')} variant="contained">
          Switch to A Theme
        </Button>
        <Button onClick={() => setActiveTheme('bTheme')} variant="contained">
          Switch to B Theme
        </Button>
        <Button onClick={() => setActiveTheme('cTheme')} variant="contained">
          Switch to C Theme
        </Button>
      </Box>
      <ul>
        <li>User System Roles: {JSON.stringify(userSystemRoles)}</li>
        <li>Authorized Folders: {JSON.stringify(authorizedFolders)}</li>
        {useCheckPermissions(SYSTEM_ROLES.ROLE_ADMIN) && <li>User is an ADMIN</li>}
        {useCheckPermissions(SYSTEM_ROLES.ROLE_DEVELOPER) && <li>User is a DEVELOPER</li>}
      </ul>
      <FolderSelector />
      <ActiveFolderDisplay />
    </>
  )
}

export default App;
