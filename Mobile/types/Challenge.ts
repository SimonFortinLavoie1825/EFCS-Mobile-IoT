export type Status = "pending" | "completed";

// Type exposé par le contexte des défis (ChallengeContext).
// Décrit les valeurs et fonctions que le contexte fournit aux composants.
export type ChallengeContextType = {
  // Position actuelle de l'utilisateur dans le classement (1 = premier).
  currentUserPosition: number;
  // Total de points de l'utilisateur courant.
  currentUserPoints: number;
  // Liste ordonnée des joueurs pour le leaderboard.
  leaderboard: LeaderboardUser[];
  // Récupère l'ensemble des défis associés à un utilisateur (doc Firestore prévu par userId).
  getChallenge: (userId: string) => Promise<Challenge[]>;
  // Récupère uniquement les défis en attente (status === "pending").
  getPendingChallenge: (userId: string) => Promise<Challenge[]>;
  // Récupère uniquement les défis complétés (status === "completed").
  getCompletedChallenge: (userId: string) => Promise<Challenge[]>;
  // Calcule le total de points gagnés par un utilisateur (somme des pointsObtained pour les défis complétés).
  getPointsFromUsers: (userId: string) => Promise<number>;
  // Crée un nouveau défi pour la cible (écrit dans Firestore). sequence est typiquement une string
  // représentant la séquence de LEDs/coups (ex: "12312").
  createChallenge: (
    targetUserId: string,
    challengerId: string,
    sequence: string
  ) => Promise<void>;
};

// Représente un défi individuel.
export type Challenge = {
  // id du joueur qui a lancé le défi.
  challenger: string;
  // Points obtenus par le joueur cible lors du défi (nécessaire pour le calcul du classement).
  pointsObtained: number;
  // Représentation de la séquence du défi (ex: "12312"). Longueur utilisée pour calculer points potentiels.
  sequence: string;
  // Statut : "pending" si en attente, "completed" si terminé.
  status: Status;
};

// Entrée du leaderboard : identifiant, nom affiché et points totaux.
export type LeaderboardUser = {
    id: string;
    name: string;
    points: number;
  };
