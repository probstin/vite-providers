import axios, { AxiosInstance } from 'axios';
import React, { createContext, useContext } from 'react';

interface AxiosInstancesContextProps {
    instances: { [key: string]: AxiosInstance };
}

const AxiosProviderContext = createContext<AxiosInstancesContextProps | undefined>(undefined);
const { Provider } = AxiosProviderContext;

export default function AxiosProvider({ children, apiUrls }: any & React.PropsWithChildren) {
    const globalAxiosDefaults = {
        headers: {
            Authorization: 'Bearer your_token_here' // Replace with your actual token
            // ... other global headers or settings
        }
    };

    const instances = Object
        .keys(apiUrls)
        .reduce((acc, key) => {
            acc[key] = axios.create({ baseURL: apiUrls[key], ...globalAxiosDefaults });
            return acc;
        }, {} as { [key: string]: AxiosInstance });

    return (
        <Provider value={{ instances }}>
            {children}
        </Provider>
    );
}

export const useAxios = (name: string) => {
    const context = useContext(AxiosProviderContext);
    if (!context) {
        throw new Error('useAxios must be used within a AxiosProvider');
    }

    const axiosInstance = context.instances[name];
    if (!axiosInstance) {
        throw new Error(`No axios instance named "${name}" found`);
    }
    
    return axiosInstance;
};