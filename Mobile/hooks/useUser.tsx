import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context)
        throw new Error("useUserContext doit être utilisé dans UserContextProvider")
    return context
}