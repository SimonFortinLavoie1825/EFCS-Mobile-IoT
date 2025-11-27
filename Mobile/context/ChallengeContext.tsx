import { ChallengeContextType, Status } from "@/types/Challenge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const ChallengeContext = createContext<ChallengeContextType | null>(
  null
);

export function ChallengeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [challenger, setChallenger] = useState<string | undefined>(undefined);
  const [pointsObtained, setPointsObtained] = useState<number | undefined>(
    undefined
  );
  const [sequence, setSequence] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);

  async function getChallenge(): Promise<void> {

  }
  async function getAllChallenges(): Promise<void> {
    
  }
  async function createChallenge(): Promise<void> {
    
  }

  return (
    <ChallengeContext.Provider
      value={{
        challenger,
        pointsObtained,
        sequence,
        status,
        getChallenge,
        getAllChallenges,
        createChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
