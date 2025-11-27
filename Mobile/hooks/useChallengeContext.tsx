import { ChallengeContext } from "../context/ChallengeContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(ChallengeContext);

    if (!context)
        throw new Error("useAuth doit être utilisé dans AuthenticationContextProvider")

    return context
}