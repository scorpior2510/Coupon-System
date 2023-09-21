export interface UserModel {
    email: string;
    clientType: ClientType;
    token: string;
}

export interface LoginReqModel {
    email: string;
    password: string;
    clientType: ClientType;
}

export interface LoginResModel {
    token: string;
}

export enum ClientType {
    ADMINISTRATOR = "ADMINISTRATOR",
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER",
    NONE = "NONE"
}