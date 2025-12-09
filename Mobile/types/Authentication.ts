import { type User } from '@/types/User'

export type AuthenticationContextType = {
    user: User | undefined;
    isAuthenticated: boolean | undefined;
    register: (username:string, email: string, password: string, confirmPassword: string, firstName: string, lastName:string) => void;
    logout: () => void;
    login:(email: string, password:string) => void;
    modifyPassword:(oldPassword: string, newPassword: string) => void;
}