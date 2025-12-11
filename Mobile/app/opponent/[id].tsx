import { useUserContext } from "@/hooks/useUser";
import { User } from "@/types/User";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useChallenge } from "@/hooks/useChallengeContext";
import { useAuth } from "@/hooks/useAuth";

// Écran "Créer un défi" pour un adversaire donné (paramètre id)
// - Récupère les détails de l'adversaire via getUser(id) et affiche un loader pendant le fetch.
// - Permet de construire une séquence (tableau de nombres) en ajoutant des LEDs (1/2/3), max 15 coups.
// - addLed/removeLast/clearAll : fonctions utilitaires pour manipuler la séquence locale.
// - sendChallenge : utilise createChallenge (useChallenge) pour poster le défi chez l'adversaire (Firestore).
// - Gère le feedback utilisateur via message (succès/erreur) et réinitialise la séquence sur succès.

export default function CreateChallenge() {
  const { id } = useLocalSearchParams();
  const { getUser } = useUserContext();
  const { createChallenge } = useChallenge();
  const { user } = useAuth();
  const [opponent, setOpponent] = useState<User>();
  const [message, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // fetchUserDetail : charge les informations de l'adversaire et met l'état loading pendant l'opération
  async function fetchUserDetail(): Promise<void> {
    setLoading(true);
    const data = await getUser(id as string);
    setOpponent(data as User);
    setLoading(false);
  }
  useEffect(() => {
    fetchUserDetail();
  }, []);

  const [sequence, setSequence] = useState<number[]>([]);

  // addLed / removeLast / clearAll : manipulation simple du tableau sequence avec limites
  const addLed = (value: number) => {
    if (sequence.length < 15) setSequence([...sequence, value]);
  };
  const removeLast = () => setSequence(sequence.slice(0, -1));
  const clearAll = () => setSequence([]);
  // sendChallenge : compose la séquence sous forme de string et appelle createChallenge,
  // puis affiche un message de retour et nettoie la séquence en cas de succès
  async function sendChallenge() {
    if (!opponent || !user) return;
    try {
      createChallenge(opponent.userId, user.userId, sequence.join(""));
      setSequence([]);
      setMsg("Défi Créer avec succès");
    } catch (error: any) {
      setMsg(error.message);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Créer un défi</Text>
          <Text style={styles.infoText}>
            Pour {opponent?.firstName} {opponent?.lastName}
          </Text>
          {message !== "" && <Text style={styles.box}>{message}</Text>}
          <Text style={styles.title}>Séquence ({sequence.length}/15)</Text>
          <View style={styles.sequenceContainer}>
            {sequence.map((led, index) => (
              <View
                key={index}
                style={[
                  styles.ledCircle,
                  led === 1
                    ? styles.ledWhite
                    : led === 2
                    ? styles.ledRed
                    : styles.ledYellow,
                ]}
              >
                <Text>{led}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>Sélectionner les LEDs</Text>
          <View style={styles.ledButtonsContainer}>
            <TouchableOpacity onPress={() => addLed(1)}>
              <Image
                source={require("@/assets/images/white_led.png")}
                style={styles.ledImage}
              />
              <Text style={styles.ledLabel}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addLed(2)}>
              <Image
                source={require("@/assets/images/red_led.png")}
                style={styles.ledImage}
              />
              <Text style={styles.ledLabel}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addLed(3)}>
              <Image
                source={require("@/assets/images/yellow_led.png")}
                style={styles.ledImage}
              />
              <Text style={styles.ledLabel}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionsContainer}>
            <CustomButton
              title="Retirer dernier"
              isDisabled={false}
              onPressAction={() => removeLast()}
            />
            <CustomButton
              title="Effacer tout"
              isDisabled={false}
              onPressAction={() => clearAll()}
            />
          </View>
          <CustomButton
            title="Envoyer le défi"
            isDisabled={sequence.length < 5}
            onPressAction={() => sendChallenge()}
          />
          <Text style={styles.infoText}>
            La séquence doit contenir entre 5 et 15 coups
          </Text>
        </View>
      )}
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
    marginBottom: 8,
    color: "#000",
  },
  box: {
    color: "blue",
    alignSelf: "center",
  },
  sequenceContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  ledCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ledWhite: {
    backgroundColor: "#b1b7b3ff",
  },
  ledRed: {
    backgroundColor: "#ef4444",
  },
  ledYellow: {
    backgroundColor: "#d3ee35ff",
  },
  ledButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  ledImage: {
    width: 56,
    height: 56,
  },
  ledLabel: {
    textAlign: "center",
    marginTop: 4,
    color: "#000",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoText: {
    textAlign: "center",
    color: "#4b5563",
    marginTop: 12,
    fontSize: 14,
  },
});
