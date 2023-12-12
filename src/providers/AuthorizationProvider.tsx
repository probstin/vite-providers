import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserProfile } from "./AuthenticationProvider";

type ClientModeProps = {
    mode: "client";
    configFileName?: string; // Default = 'roles.json'
};

type ServerModeProps = {
    mode: "server";
    apiEndpoint: string;
};

type RoleProviderProps = React.PropsWithChildren & (ClientModeProps | ServerModeProps);

type SystemRoleMapping = {
    [key: string]: string[];
}

const AuthorizationContext = createContext<string[] | null>(null);

function AuthorizationProvider({
    children,
    mode,
    ...props
}: RoleProviderProps): React.ReactElement {
    const { ldapRoles } = useUserProfile();
    const [systemRoles, setSystemRoles] = useState<string[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // CLIENT mode
                // - requires a roles.json mapping file that defines the role structure of the application
                // - retrieves the configuration
                // - compares it to the users enterprise roles (from their auth profile)
                // - determines which system role they have
                if (mode === "client") {
                    const { configFileName } = props as ClientModeProps;
                    const { data: authorizationConfig } = await axios.get<SystemRoleMapping>(configFileName || "roles.json");

                    const userSystemRoles: string[] = Object
                        .entries(authorizationConfig)
                        .filter(([appRole, requiredRoles]) => requiredRoles.some(role => ldapRoles.includes(role)))
                        .map(([appRole]) => appRole);

                    setSystemRoles(userSystemRoles);
                }
                // SERVER mode
                // - requires an API endpoint to return an array of strings
                // - each value is a system role that the user has
                // - API is responsible for determining the roles
                else if (mode === "server") {
                    const { apiEndpoint } = props as ServerModeProps;
                    const response = await axios.get<string[]>(apiEndpoint);
                    setSystemRoles(response.data); // Assuming the endpoint returns the app role directly
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return (
        <>
            {isLoading && <p>Loading authorization config...</p>}
            {!isLoading && error && <p style={{ color: "red " }}>[AuthorizationProvider]: {error}</p>}
            {!isLoading && !error && systemRoles && <AuthorizationContext.Provider value={systemRoles}>{children}</AuthorizationContext.Provider>}
        </>
    );
};

const useUserSystemRoles = (): string[] | null => {
    const context = useContext(AuthorizationContext);

    if (context === undefined) {
        throw new Error('useAppRoles must be used within the AuthorizationProvider');
    }

    return context;
};

const useCheckPermissions = (role: string): boolean => {
    const appRoles = useUserSystemRoles();

    if (appRoles) {
        return appRoles.includes(role);
    }

    return false;
};

export { AuthorizationProvider, useCheckPermissions, useUserSystemRoles };

