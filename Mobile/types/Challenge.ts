export type Status = "pending" | "completed";

export type ChallengeContextType = {
  currentUserPosition: number;
  currentUserPoints: number;
  leaderboard: LeaderboardUser[];
  getChallenge: (userId: string) => Promise<Challenge[]>;
  getPendingChallenge: (userId: string) => Promise<Challenge[]>;
  getCompletedChallenge: (userId: string) => Promise<Challenge[]>;
  getPointsFromUsers: (userId: string) => Promise<number>;
  createChallenge: (
    targetUserId: string,
    challengerId: string,
    sequence: string
  ) => Promise<void>;
};

export type Challenge = {
  challenger: string;
  pointsObtained: number;
  sequence: string;
  status: Status;
};

export type LeaderboardUser = {
    id: string;
    name: string;
    points: number;
  };
