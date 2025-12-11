import { FlatList, View, StyleSheet } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";

// Écran d'accueil (liste des joueurs)
// - Utilise getAllUsers() du UserContext pour récupérer tous les utilisateurs depuis Firestore.
// - Filtre l'utilisateur courant pour ne pas afficher la carte de soi-même.
// - Affiche une FlatList de PlayerCard (composant réutilisable) pour initier un défi vers un adversaire.

export default function Index() {
  const [users, setUsers] = useState<User[]>();
  const { getAllUsers } = useUserContext();
  const { user } = useAuth();

  // useEffect : charge la liste des utilisateurs au montage / quand la session change.
  // - Filtre l'utilisateur courant si present.
  useEffect(() => {
    getAllUsers().then((data) => {
      if (user?.userId) {
        const filtered = data.filter((u) => u.userId !== user.userId);
        setUsers(filtered);
      } else {
        setUsers(data);
      }
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item: user }) => (
          <PlayerCard
            name={user.firstName}
            opponentId={user.userId}
          ></PlayerCard>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fcfcfcff",
    gap: 12,
    margin: 4,
  },
});
