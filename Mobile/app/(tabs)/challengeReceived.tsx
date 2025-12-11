import { useAuth } from "@/hooks/useAuth";
import { useChallenge } from "@/hooks/useChallengeContext";
import { useUserContext } from "@/hooks/useUser";
import { Challenge } from "@/types/Challenge";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Écran "Défis reçus"
// - Récupère les défis en attente pour l'utilisateur via useChallenge.getPendingChallenge.
// - Charge aussi les informations des challengers via useUserContext.getUser pour afficher leur username.
// - useEffect : effectue un chargement asynchrone des défis puis des utilisateurs correspondants.
// - Structure d'affichage : FlatList montrant l'expéditeur, la longueur de la séquence et les points potentiels.
// - Remarques : la map des challengerUsers évite des appels répétés au backend pour le même id.

export default function ReceivedChallenges() {
  const [pendingChallenge, setPendingChallenge] = useState<Challenge[]>([]);
  const { getPendingChallenge } = useChallenge();
  const { user } = useAuth();
  const { getUser } = useUserContext();
  //Prompt: Comment je peux attitrer les informations des utilisateurs qui ont envoyé plusieurs défis ?
  const [challengerUsers, setChallengerUsers] = useState<Record<string, any>>(
    {}
  );
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const data = await getPendingChallenge(user.userId);
      setPendingChallenge(data);

      const ids = [...new Set(data.map((c) => c.challenger))];
      const result: Record<string, any> = {};
      for (const id of ids) {
        const userData = await getUser(id);
        result[id] = userData;
      }
      setChallengerUsers(result);
    };

    load();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Défis reçus</Text>

      {pendingChallenge.length === 0 && (
        <Text style={{ color: "#555" }}>Aucun défi reçu.</Text>
      )}
      <FlatList
        data={pendingChallenge}
        keyExtractor={(item, index) => item.challenger + "-" + index}
        renderItem={({ item }) => (
          <View style={styles.challengeCard}>
            <Text style={styles.fromText}>
              De :{" "}
              {challengerUsers[item.challenger]?.username ?? "Chargement..."}
            </Text>
            <Text style={styles.detailText}>
              Séquence : {item.sequence.length}
            </Text>
            <Text style={styles.detailText}>
              Points potentiels : {item.sequence.length} Mode expert: {item.sequence.length * 2}
            </Text>
            <Text style={styles.detailText}>
              Points potentiels à infliger : {item.sequence.length} Mode expert: {item.sequence.length * 2}
            </Text>
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
  challengeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  fromText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  detailText: {
    fontSize: 16,
    color: "#374151",
  },
});
