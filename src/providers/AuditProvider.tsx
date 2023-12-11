import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { findHighestRole, findKeysByValues } from "./AuditProviderUtils";

interface AuditData {
    roles: { admin: string; developer: string; normal: string };
    userLevel?: string;
}

interface AuditProvider {
    category: string;
    roles: string[];
    children: React.ReactNode;
}

const AuditProvider = ({
    configFile = "audit.json",
    roles,
    children,
}: { configFile?: string; roles?: string[] } & React.PropsWithChildren) => {
    const [auditData, setAuditData] = useState<AuditData | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getConfig = async () => {
            axios
                .get(configFile)
                .then(({ data: config }: AxiosResponse) => {
                    const levels = findKeysByValues(config.roles, roles || []);
                    const highestRole = findHighestRole(levels);
                    return { ...config, userLevel: highestRole };
                })
                .then((config: any) =>
                    setAuditData((prevState) => ({ ...prevState, ...config }))
                )
                .catch((error: { message: string }) => {
                    setError(error.message);
                })
                .finally(() => setLoading(false));
        };

        getConfig();
    }, []);

    useEffect(() => {
        if (auditData) {
            console.log(auditData);
        }
    }, [auditData]);

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && error && <div>Error: {error}</div>}
            {!isLoading && !error && auditData && children}
        </>
    );
};

export default AuditProvider;
