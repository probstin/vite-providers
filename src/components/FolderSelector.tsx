import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { useActiveFolder, useAuthorizedFolders } from '../providers/FolderProvider';

const FolderSelector: React.FC = () => {
    const authorizedFolders = useAuthorizedFolders();
    const { activeFolder, setActiveFolder } = useActiveFolder();

    const handleFolderChange = ((event: SelectChangeEvent<string>) => {
        const folderName = event.target.value as string;

        // Find the folder object based on the selected folder name
        const selectedFolder = authorizedFolders.find((folder) => folder.folderName === folderName);

        if (selectedFolder) {
            setActiveFolder(selectedFolder);
        }
    });

    return (
        <Select
            value={activeFolder ? activeFolder.folderName : ''}
            onChange={handleFolderChange}
            fullWidth
            label="Select Folder"
        >
            {authorizedFolders.map((folder) => (
                <MenuItem key={folder.folderName} value={folder.folderName}>
                    {folder.folderName}
                </MenuItem>
            ))}
        </Select>
    );
};

export default FolderSelector;