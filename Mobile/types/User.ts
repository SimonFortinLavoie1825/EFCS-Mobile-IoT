export type UserContextType = {
    name: string,
    lastName: string,
    profileImage: string,
    setProfileImage: (profileImage: string) => void
    getUserCreds: (uid: string) => Promise<void>
}