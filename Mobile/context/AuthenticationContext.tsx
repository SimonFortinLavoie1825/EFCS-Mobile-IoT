import { type User } from "@/types/User";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { AuthenticationContextType } from "../types/Authentication";
import { Alert } from "react-native";

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export function AuthenticationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userFireStore = await getDoc(
          doc(db, "users", auth.currentUser!.uid)
        );
        setUser(userFireStore.data() as User);
      } else {
        setIsAuthenticated(false);
        setUser(undefined);
      }
    });
    return unsub;
  }, []);

  async function register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    try {
      if(password !== confirmPassword)
        throw new Error("Les mots de passes ne se correspondent pas");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const newUser: User = {
        userId: cred.user.uid,
        username,
        firstName,
        lastName,
      };
      await setDoc(doc(db, "users", cred.user.uid), newUser);

      setUser(newUser);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Le courriel existe déjà");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Le courriel est invalide");
      }
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await getDoc(doc(db, "users", credentials.user.uid));
      setUser(user.data() as User);
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        throw new Error("Le courriel est invalide");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Le mot de passe est invalide");
      }
    }
  }
  async function logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Erreur lors de la déconnexion:", error);
    }
  }

  async function modifyPassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== undefined && user !== null && user.email !== null) {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      try {
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);

        Alert.alert("Mot de passe changé avec succès");
      } catch (error) {
        console.log(error);
        Alert.alert("Erreur lors du changement du mot de passe.");
      }
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        user,
        register,
        login,
        logout,
        modifyPassword
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
