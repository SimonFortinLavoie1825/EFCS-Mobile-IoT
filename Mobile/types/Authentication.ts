import { type User } from '@/types/User'

// Types exposés par le contexte d'authentification.
// Ce type décrit l'API que le AuthenticationContext doit fournir aux composants.
export type AuthenticationContextType = {
    // Données de l'utilisateur connecté (ou undefined si non connecté).
    user: User | undefined;
    // Indique si l'utilisateur est authentifié (undefined pendant la détection initiale).
    isAuthenticated: boolean | undefined;
    // Crée un compte utilisateur et enregistre les informations (username, email, noms).
    // Paramètres : username, email, password, confirmPassword, firstName, lastName.
    // Note : la validation des mots de passe (ex. égalité password/confirmPassword) peut être faite côté impl.
    register: (username:string, email: string, password: string, confirmPassword: string, firstName: string, lastName:string) => void;
    // Déconnecte l'utilisateur courant.
    logout: () => void;
    // Authentifie l'utilisateur avec email et mot de passe.
    login:(email: string, password:string) => void;
    // Modifie le mot de passe de l'utilisateur après ré-authentification.
    modifyPassword:(oldPassword: string, newPassword: string) => void;
}