export type UserContextType = {
    profileImage: string,
    changeProfileImage: (profileImage: string) => void,
    getAllUsers: () => Promise<User[]>
    getUser:(id : string) => Promise<User | null>
}

export type User = {
    userId: string,
    username: string,
    firstName: string,
    lastName: string
}