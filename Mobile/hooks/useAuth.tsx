import { AuthenticationContext } from "../context/AuthenticationContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthenticationContext);

    if (!context)
        throw new Error("useAuth doit être utilisé dans AuthenticationContextProvider")

    return context
}