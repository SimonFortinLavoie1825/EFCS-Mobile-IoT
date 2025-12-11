import { useChallenge } from "@/hooks/useChallengeContext";
import { router } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAuth } from "@/hooks/useAuth";
import { LeaderboardUser } from "@/types/Challenge";

// Écran "Classement" (Leaderboard)
// - Récupère le classement, la position et les points de l'utilisateur courant via useChallenge.
// - Affiche une FlatList des joueurs (LeaderboardUser) avec leur rang et leurs points.
// - Bouton "Défier" : pousse vers la route /opponent/[id] pour initier un défi, désactivé si l'utilisateur défie lui-même.

export default function Leaderboard() {
  const { leaderboard, currentUserPoints, currentUserPosition } =
    useChallenge();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classement</Text>
      <Text style={styles.title}>
        Position Actuelle: {currentUserPosition}, {currentUserPoints} pts
      </Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item: LeaderboardUser, index: number) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardCard}>
            <Text style={styles.playerName}>
              #{index + 1} {item.name}
            </Text>
            <Text style={styles.playerPoints}>{item.points} pts</Text>
            <CustomButton
              title="Défier"
              isDisabled={user?.userId === item.id}
              onPressAction={() => {
                router.push(`/opponent/${item.id}`);
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  leaderboardCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  playerPoints: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
});
