import {
  Challenge,
  ChallengeContextType,
  LeaderboardUser,
} from "@/types/Challenge";
import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUser";
import { User } from "@/types/User";

export const ChallengeContext = createContext<ChallengeContextType | null>(
  null
);

export function ChallengeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { getAllUsers } = useUserContext();
  const [currentUserPoints, setPoints] = useState<number>(0);
  const [currentUserPosition, setPosition] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
  if (!user) return;

  const unsub = onSnapshot(collection(db, "challenges"), async (snapshot) => {
    // Tous les utilisateurs
    const users = await getAllUsers();

    const usersWithPoints = await Promise.all(
      users.map(async (u: User) => {
        const pts = await getPointsFromUsers(u.userId);
        return {
          id: u.userId,
          name: u.firstName ?? "Sans nom",
          points: pts ?? 0,
        };
      })
    );

    usersWithPoints.sort((a, b) => b.points - a.points);
    setLeaderboard(usersWithPoints);

    if (user?.userId) {
      const index = usersWithPoints.findIndex((u) => u.id === user.userId);
      if (index !== -1) {
        setPosition(index + 1);
        setPoints(usersWithPoints[index].points);
      }
    }
  });

  return () => unsub();
}, [user]);

  /*Retourne les défis d'un utilisateur. Qu'ils soient complètés ou non*/
  async function getChallenge(userId: string): Promise<Challenge[]> {
    const challengesDoc = doc(db, "challenges", userId);
    const challenges = await getDoc(challengesDoc);

    if (!challenges.exists()) return [];

    const dataChallenges = challenges.data();
    return dataChallenges.challenges ?? [];
  }
  /*Retourne les défis en attentes d'un utilisateur.*/
  async function getPendingChallenge(userId: string): Promise<Challenge[]> {
    const all = await getChallenge(userId);
    return all.filter((c) => c.status === "pending");
  }
  /*Retourne les défis complétés d'un utilisateur.*/
  async function getCompletedChallenge(userId: string): Promise<Challenge[]> {
    const all = await getChallenge(userId);
    return all.filter((c) => c.status === "completed");
  }
  /*Retourne le nombre de points gagnés d'un utilisateur*/
  async function getPointsFromUsers(userId: string): Promise<number> {
    const challenges = await getChallenge(userId);

    const total = challenges
      .filter((challenge) => challenge.status === "completed")
      .reduce((sum, challenge) => sum + challenge.pointsObtained, 0);

    return total;
  }
  /*Créer un défi pour un utilisateur*/
  async function createChallenge(
    targetUserId: string,
    challengerId: string,
    sequence: string
  ): Promise<void> {
    const challengesDoc = doc(db, "challenges", targetUserId);

    const newChallenge: Challenge = {
      challenger: challengerId,
      pointsObtained: 0,
      sequence,
      status: "pending",
    };
    try {
    const existingChallenges = await getDoc(challengesDoc);

    if (existingChallenges.exists()) {
      const data = existingChallenges.data();

      const updatedChallenges = [
        ...(data.challenges || []),
        newChallenge,
      ];
      await setDoc(challengesDoc, { challenges: updatedChallenges });
    } else {
      await setDoc(challengesDoc, { challenges: [newChallenge] });
    }
  } catch (error: any) {
    throw new Error("Une erreur est survenue lors de la création du défi.");
  }
}

  return (
    <ChallengeContext.Provider
      value={{
        leaderboard,
        currentUserPoints,
        currentUserPosition,
        getChallenge,
        getPendingChallenge,
        getCompletedChallenge,
        getPointsFromUsers,
        createChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
