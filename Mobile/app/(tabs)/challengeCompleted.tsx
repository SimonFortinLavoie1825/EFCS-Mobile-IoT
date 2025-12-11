import { useAuth } from "@/hooks/useAuth";
import { useChallenge } from "@/hooks/useChallengeContext";
import { Challenge } from "@/types/Challenge";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Écran "Défis complétés"
// - Récupère la liste des défis complétés pour l'utilisateur courant via useChallenge.getCompletedChallenge.
// - useEffect : déclenché quand l'utilisateur (user) est disponible.
// - Affiche une FlatList des défis complétés avec des détails (auteur, points obtenus, longueur de la séquence).

export default function CompletedChallenges() {
  const [completedChallenge, setCompletedChallenge] = useState<Challenge[]>([]);
  const { getCompletedChallenge } = useChallenge();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    getCompletedChallenge(user.userId).then((data) => {
      setCompletedChallenge(data);
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Défis complétés</Text>

      {completedChallenge.length === 0 && (
        <Text style={{ color: "#555" }}>Aucun défi complété.</Text>
      )}
      <FlatList
        data={completedChallenge}
        keyExtractor={(item, index) => item.challenger + "-" + index}
        renderItem={({ item, index }) => (
          <View style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>Défi #{index + 1}</Text>
            <Text style={styles.detailText}>Créé par : {item.challenger}</Text>
            <Text style={styles.detailText}>
              Nombre de coups réussis {item.pointsObtained}
            </Text>
            <Text style={styles.detailText}>
              Nombre de coups demandés {item.sequence.length}
            </Text>
            <Text style={styles.detailText}>
              Points obtenus : {item.pointsObtained}
            </Text>
            <Text style={styles.detailText}>
              Points perdus : {item.sequence.length - item.pointsObtained}
            </Text>
            <Text style={styles.detailText}>
              Points obtenus de l&apos;adversaire : {item.sequence.length - item.pointsObtained}
            </Text>
            <Text style={styles.detailText}>
              Points perdus de l&apos;adversaire : {item.pointsObtained}
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
  challengeTitle: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
  },
  detailText: {
    fontSize: 16,
    color: "#374151",
  },
});
