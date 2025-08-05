export type RoleEnum = "ROLE_ADMIN" | "ROLE_CLIENT" | "ROLE_OPERATOR" | "ROLE_VIGILANTE";

export type CredentialsDTO = {
  username: string;
  password: string;
};

export type AccessTokenPayloadDTO = {
  exp: number;
  user_name: string;
  authorities: RoleEnum[];
};
