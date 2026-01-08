export type PolicyFnTypes<User, Resource> = (
    user: User;
    resource: Resource;
) => boolean