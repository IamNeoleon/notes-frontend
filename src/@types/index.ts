export interface IUser {
    email: string,
    password: string,
}

export interface INote {
    _id: string,
    title: string,
    content: string,
    createdAt: string
}

export interface IUserInfo {
    id: string,
    name: string,
    email: string
}