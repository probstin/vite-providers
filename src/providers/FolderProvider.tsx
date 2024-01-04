import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstances } from './AxiosProvider';

interface FolderObject {
    folderName: string;
    apiUrl: string;
}

// TODO: ...
// these would come from the config provider
const allFolders: FolderObject[] = [
    { folderName: 'FOLDER_A', apiUrl: 'http://localhost:4500' },
    { folderName: 'FOLDER_B', apiUrl: 'http://localhost:8443' },
];

interface FolderContextProps {
    authorizedFolders: FolderObject[];
    activeFolder: FolderObject | null;
    setActiveFolder: React.Dispatch<React.SetStateAction<FolderObject | null>>;
}

const FolderContext = createContext<FolderContextProps>({
    authorizedFolders: [],
    activeFolder: null,
    setActiveFolder: () => null,
});

function filterAuthorizedFolders(staticFolders: FolderObject[], folders: string[]): FolderObject[] | PromiseLike<FolderObject[]> {
    return staticFolders.filter((folder) => folders.includes(folder.folderName));
}

export default function FolderProvider({ children }: React.PropsWithChildren): React.ReactElement {
    const primaryApi = axiosInstances['secondary'];
    const [authorizedFolders, setAuthorizedFolders] = useState<FolderObject[]>([]);
    const [activeFolder, setActiveFolder] = useState<FolderObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        primaryApi
            .get<string[]>('authorized-folders')
            .then(({ data }: AxiosResponse) => data)
            .then((authorizedFolderNames: string[]) => filterAuthorizedFolders(allFolders, authorizedFolderNames))
            .then((authorized: FolderObject[]) => {
                if (authorized.length > 0) {
                    setAuthorizedFolders(authorized);
                    setActiveFolder(authorized[0]);
                }
            })
            .catch(({ message }: AxiosError) => setError(message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <FolderContext.Provider value={{ authorizedFolders, activeFolder, setActiveFolder }}>
            {children}
        </FolderContext.Provider>
    );
};

export const useAuthorizedFolders = () => {
    const context = useContext(FolderContext);

    if (!context) {
        throw new Error('useAuthorizedFolders must be used within a FolderProvider');
    }

    return context.authorizedFolders;
};

export const useActiveFolder = () => {
    const context = useContext(FolderContext);

    if (!context) {
        throw new Error('useActiveFolder must be used within a FolderProvider');
    }

    return { activeFolder: context.activeFolder, setActiveFolder: context.setActiveFolder };
};
