import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticationContext = createContext<any | null>(null);

function AuthenticationProvider({ children }: React.PropsWithChildren): React.ReactElement {
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:4500/userProfile')
            .then(({ data: userProfile }) => setUserProfile((prevValue: any) => ({ ...prevValue, ...userProfile })))
            .catch((error: { message: string }) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {isLoading && <p>Loading user profile...</p>}
            {!isLoading && error && <p style={{ color: "red " }}>[AuthenticationProvider]: {error}</p>}
            {!isLoading && !error && userProfile && <AuthenticationContext.Provider value={userProfile}>{children}</AuthenticationContext.Provider>}
        </>
    )
}

const useUserProfile = (): any | null => {
    const context = useContext(AuthenticationContext);

    if (context === undefined) {
        throw new Error('useUserProfile must be used within the AuthenticationProvider');
    }

    return context;
};

export { AuthenticationProvider, useUserProfile };
