import axios, { AxiosInstance } from 'axios';
import React from 'react';

type AxiosProviderProps = {
    apiUrls: { [key: string]: string };
} & React.PropsWithChildren

export const axiosInstances: { [key: string]: AxiosInstance } = {};

export default function AxiosProvider({ children, apiUrls }: AxiosProviderProps) {
    const globalAxiosDefaults = {
        headers: {
            Authorization: 'Bearer your_token_here' // Replace with your actual token
            // ... other global headers or settings
        }
    };

    Object.keys(apiUrls).forEach(key => {
        axiosInstances[key] = axios.create({
            baseURL: apiUrls[key],
            ...globalAxiosDefaults
            // ... other global configuration
        });
    });

    return children;
}
