// assumes values are unique
const findKeysByValues = (obj: any, valuesToFind: string[]): string[] => {
    const keys = valuesToFind
        .map(valueToFind =>
            Object
                .entries(obj)
                .find(([key, value]) => value === valueToFind)?.[0]
        )
        .filter(key => key !== undefined) as string[];

    return keys;
};

type Role = "admin" | "developer" | "normal" | "zero";

const roleHierarchy: Record<Role, number> = {
    admin: 3,
    developer: 2,
    normal: 1,
    zero: 0
};

const isValidRole = (role: string): role is Role => {
    return role in roleHierarchy;
}

const findHighestRole = (roles: string[]): Role => {
    return roles
        .filter(isValidRole)
        .reduce((highest, role) => {
            const rank = roleHierarchy[role];
            return rank > roleHierarchy[highest] ? role : highest;
        }, "zero" as Role) as Role; // "zero" is the default value
};

export { findHighestRole, findKeysByValues };

