import { useActiveFolder } from "../providers/FolderProvider";

export default function ActiveFolderDisplay() {
    const { activeFolder } = useActiveFolder();

    return (
        <div>{activeFolder?.folderName}</div>
    )
}
