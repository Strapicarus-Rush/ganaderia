export interface User {
    id?: number | undefined | null,
    username: string | undefined | null,
    password?: string | undefined | null,
    createdAt: Date | undefined | null,
    updatedAt: Date | undefined | null,
    password_confirmation: String | undefined | null,
}
export interface authUser {
    data: User,
    message: string | Array<string>,
    hasErr: boolean
    userssesion: string | undefined,
    sys_Alert: string | Array<string> | undefined,
}