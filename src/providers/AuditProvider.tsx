import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { findHighestRole, findKeysByValues } from "./AuditProviderUtils";
import { useUserSystemRoles } from "./AuthorizationProvider";

interface AuditData {
    roles: { admin: string; developer: string; normal: string };
    userLevel?: string;
}

type AuditProviderProps = {
    configFile?: string;
} & React.PropsWithChildren

const AuditProvider = ({
    configFile = "audit.json",
    children,
}: AuditProviderProps) => {
    const usr = useUserSystemRoles() || [];
    const [auditData, setAuditData] = useState<AuditData | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAuditConfig = async () => {
            axios
                .get(configFile)
                .then(({ data: config }: AxiosResponse) => {
                    const levels = findKeysByValues(config.roles, usr);
                    const highestRole = findHighestRole(levels);
                    return { ...config, userLevel: highestRole };
                })
                .then((config: any) => setAuditData((prevState) => ({ ...prevState, ...config })))
                .catch((error: { message: string }) => setError(error.message))
                .finally(() => setLoading(false));
        };

        getAuditConfig();
    }, []);

    return (
        <>
            {isLoading && <div>Loading audit config...</div>}
            {!isLoading && error && <p style={{ color: "red " }}>[AuditProvider]: {error}</p>}
            {!isLoading && !error && auditData && children}
        </>
    );
};

export default AuditProvider;
