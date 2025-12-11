// Types liés à l'utilisateur utilisés par le UserContext et l'application.
// - User : représente un utilisateur côté client (id, nom d'utilisateur et noms).
// - UserContextType : interface exposée par le UserContext pour manipuler l'image de profil
//   et pour récupérer la liste des utilisateurs ou un utilisateur spécifique.

export type UserContextType = {
    // URL ou chemin de l'image de profil affichée dans l'application.
    profileImage: string,
    // Permet de mettre à jour l'image de profil dans le contexte.
    changeProfileImage: (profileImage: string) => void,
    // Récupère tous les utilisateurs (ex: pour écran de sélection d'adversaire ou leaderboard).
    getAllUsers: () => Promise<User[]>
    // Récupère un utilisateur par son id. Retourne null si non trouvé.
    getUser:(id : string) => Promise<User | null>
}

export type User = {
    // Identifiant unique de l'utilisateur (généralement fourni par le backend).
    userId: string,
    // Nom d'utilisateur public (slug, pseudonyme).
    username: string,
    // Prénom pour affichage riche.
    firstName: string,
    // Nom de famille pour affichage riche.
    lastName: string
}