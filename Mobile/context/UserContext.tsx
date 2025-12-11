import { User, UserContextType } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "@/hooks/useAuth";

// UserContext : fournit les données et actions liées aux utilisateurs côté client.
// - profileImage : URI de l'avatar courant (persisté localement via AsyncStorage par utilisateur).
// - changeProfileImage(newAvatar) : met à jour l'état et déclenche la persistance locale.
// - getAllUsers() : récupère tous les documents de la collection "users" depuis Firestore et les mappe en type User.
// - getUser(id) : récupère un utilisateur précis depuis Firestore, retourne null si introuvable.
// - Comportement : au montage, charge l'avatar depuis AsyncStorage si présent; sauvegarde l'avatar quand il change.

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const value = await AsyncStorage.getItem(`avatarUri${user?.userId}`);
      if (value !== null) {
        setProfileImage(value);
      }
    };

    fetchAvatar();
  }, [user?.userId]);

  useEffect(() => {
    const saveAvatar = async () => {
      if (profileImage !== undefined)
        await AsyncStorage.setItem(`avatarUri${user?.userId}`, profileImage);
    };

    saveAvatar();
  }, [profileImage, user?.userId]);

  async function getAllUsers(): Promise<User[]> {
    try
    {
      const result = await getDocs(collection(db, "users"));

    const users: User[] = [];
    result.forEach((docUser) => {
      users.push({
        userId: docUser.id,
        username: docUser.data().username,
        firstName: docUser.data().firstName,
        lastName: docUser.data().lastName,
      });
    });
    return users;
    }
    catch (error: any) 
    {
      throw new Error("Une erreur est survenue lors de la récupération des utilisateurs.");
    }
  }

  async function getUser(id: string): Promise<User | null> {
    try {
      const userDoc = doc(db, "users", id);
      const result = await getDoc(userDoc);

      if (!result.exists()) return null;

      const data = result.data();
      return {
        userId: result.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      };
    } catch (error: any) {
      throw new Error("Une erreur est survenue lors de la récupération de l'utilisateurs.");
    }
  }

  async function changeProfileImage(newAvatar: string): Promise<void> {
    setProfileImage(newAvatar);
  }
  return (
    <UserContext.Provider
      value={{ profileImage, changeProfileImage, getAllUsers, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
