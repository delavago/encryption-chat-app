export interface User {
    Token: string;
    FirstName: string;
    LastName: string;
    Avatar: string;
}

export interface From {
    id: string;
    Name: string;
    Avatar: string;
    Owner: boolean;
}

export interface To {
    id: string;
    Name: string;
    Avatar: string;
    Owner: boolean;
}

export interface MessageObj {
    id: string;
    Message: string;
    Read: boolean;
    IsDeleted: boolean;
    LastModified: Date;
    DateCreated: Date;
    Reactions: string[];
    From: From;
    To: To;
}

export interface UserTiny {
    id: string;
    Name: string;
}

export interface PublicKeyBroadcastResponse {
    User: UserTiny;
    PublicKey: string;
}