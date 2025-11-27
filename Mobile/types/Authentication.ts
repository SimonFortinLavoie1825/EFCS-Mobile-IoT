export type AuthenticationContextType = {
    isAuthenticated: boolean | undefined,
    register: (email: string, password: string, name: string, lastName: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    updateUserPassword: (oldPassword: string, newPassword: string) => Promise<void>, 
}