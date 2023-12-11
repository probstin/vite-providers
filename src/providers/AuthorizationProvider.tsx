import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type CommonProps = {
    children: React.ReactNode;
};

type ClientModeProps = {
    mode: "client";
    configFileName?: string; // Default is 'roles.json'
    userRoles: string[]; // Roles of the current user
};

type ServerModeProps = {
    mode: "server";
    endpoint: string; // API endpoint to fetch roles
};

type RoleProviderProps = CommonProps & (ClientModeProps | ServerModeProps);

interface RoleConfig {
    [key: string]: string[];
}

const RoleContext = createContext<string[] | null>(null);

const AuthorizationProvider: React.FC<RoleProviderProps> = ({
    children,
    mode,
    ...props
}) => {
    const [appRoles, setAppRoles] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                if (mode === "client") {
                    const configFileName = props.configFileName || "roles.json";
                    const { data: rolesConfig } = await axios.get<RoleConfig>(configFileName);
                    const userRoles = props.userRoles;
                    const userAppRoles: string[] = [];
                    for (const [appRole, requiredRoles] of Object.entries(rolesConfig)) {
                        if (requiredRoles.some((role) => userRoles.includes(role))) {
                            userAppRoles.push(appRole);
                        }
                    }

                    setAppRoles(userAppRoles);
                } else if (mode === "server") {
                    const response = await axios.get<string[]>(props.endpoint);
                    setAppRoles(response.data); // Assuming the endpoint returns the app role directly
                }
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        if (appRoles && appRoles.length) {
            console.log(appRoles);
        }
    }, [appRoles]);

    if (error) {
        return <div>Error loading roles: {error}</div>;
    }

    return (
        <RoleContext.Provider value={appRoles}>{children}</RoleContext.Provider>
    );
};

const useAppRoles = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useAppRoles must be used within a RoleProvider');
    }
    return context;
};

const usePermissions = (role: string): boolean => {
    const appRoles = useAppRoles();

    if (appRoles) {
        return appRoles.includes(role);
    }

    return false;
};

export { AuthorizationProvider, useAppRoles, usePermissions };
