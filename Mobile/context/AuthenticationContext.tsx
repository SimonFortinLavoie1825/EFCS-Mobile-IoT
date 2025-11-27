import { useUserContext } from "@/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useSegments } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState, } from "react";
import { auth, db } from "../firebaseConfig";
import { AuthenticationContextType } from "../types/Authentication";
import { defaultAvatar } from "./UserContext";

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

export function AuthenticationContextProvider({ children } : { children: React.ReactNode }) {
    const {getUserCreds} = useUserContext()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
    const segments = useSegments();

    const goToIndex = () => {
        if (segments.length > 0) {
            router.dismissAll()
        }
    }
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserCreds(user.uid);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            });
            
            return unsub;
        }, []);
        
    const register = async (email:string, password:string, name: string, lastName: string) => {
       await createUserWithEmailAndPassword(auth, email, password).then((userCreds) => {
            setDoc(doc(db, "users", userCreds.user.uid), {
                name: name,
                lastName: lastName
            });
            AsyncStorage.setItem("avatar-"+userCreds.user.uid, defaultAvatar);
            goToIndex();
       }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('Le courriel existe déjà');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Le courriel est invalide');
            }

            console.error(error);
        });
    }

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            router.back();
        }).catch(error => {
            if (error.code === 'auth/invalid-email') {
                throw new Error('Le courriel est invalide');
            } else if (error.code === 'auth/wrong-password') {
                throw new Error('Le mot de passe est invalide');
            }
            console.error(error);
        })
    }
    
    const logout = async () => {
        await signOut(auth).then(() => {
            goToIndex();
        }).catch(error => {
            console.error(error);
        })
    }

    return ( 
        <AuthenticationContext.Provider value={{ isAuthenticated, register, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    )
}