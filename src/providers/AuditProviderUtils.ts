const findKeysByValues = (obj: any, valuesToFind: string[]) => {
    let keys = [];

    for (const valueToFind of valuesToFind) {
        for (const [key, value] of Object.entries(obj)) {
            if (value === valueToFind) {
                keys.push(key);
                break; // assuming each value is unique, we can break after finding the first match
            }
        }
    }

    return keys;
};

type Role = "admin" | "developer" | "normal" | "unknown";

const roleHierarchy: Record<Role, number> = {
    admin: 4,
    developer: 3,
    normal: 2,
    unknown: 1
};

const isRole = (role: string): role is Role => {
    return role === "admin" || role === "developer" || role === "normal";
}

const findHighestRole = (roles: string[]): Role => {
    let highestRole: Role = "normal"; // Default to the lowest role
    let highestRank = 0;

    for (const role of roles) {
        if (isRole(role)) {
            const rank = roleHierarchy[role];
            if (rank > highestRank) {
                highestRole = role;
                highestRank = rank;
            }
        }
    }

    return highestRole;
};

export { findKeysByValues, findHighestRole };
