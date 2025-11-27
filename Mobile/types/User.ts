export type UserContextType = {
    name: string,
    lastName: string,
    profileImage: string,
    setProfileImage: (profileImage: string) => void,
    getUserCreds: (uid: string) => Promise<void>,
    getAllUsers: () => Promise<User[]>
}

export type User = {
    userId: string,
    name: string,
    lastName: string
}