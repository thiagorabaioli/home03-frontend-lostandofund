export type UserCrudDTO = {
    id: number;
    name: string;
    email: string;
    roles: { authority: string }[];
}