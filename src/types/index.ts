export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    _created: string | Date;
}

export interface Chirp {
    id?: number;
    userid: number;
    content: string;
    location?: string;
    _created?: string | Date;
}