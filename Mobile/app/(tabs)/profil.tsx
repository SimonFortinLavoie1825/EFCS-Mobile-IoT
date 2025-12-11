// Écran "Profil" : affiche les informations de l'utilisateur connecté et propose des actions.
// - Affiche : avatar (profileImage du UserContext), username, prénom/nom, position et points courants.
// - Actions :
//    * Changer l'avatar via DocumentPicker -> changeProfileImage (UserContext).
//    * Modifier le mot de passe via modifyPassword (useAuth).
//    * Se déconnecter via logout (useAuth).

import { Text, Image, View, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUser";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "@/app/components/CustomButton";
import { useChallenge } from "@/hooks/useChallengeContext";
import CustomInputText from "../components/CustomInputText";
import { useState } from "react";

export default function Profil() {
  const { logout, user, modifyPassword } = useAuth();
  const { profileImage, changeProfileImage } = useUserContext();
  const { currentUserPoints, currentUserPosition } = useChallenge();
  const [currentPassword, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // loadFile : ouvre le sélecteur de document (image) et appelle changeProfileImage avec l'URI sélectionné.
  // - Gère les cas d'annulation et l'absence d'assets.
  async function loadFile(): Promise<void> {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }
    const uri = result.assets[0].uri;
    changeProfileImage(uri);
  }

  // handleSubmitNewPassword : passe l'ancien et le nouveau mot de passe à modifyPassword,
  // puis nettoie les champs locaux.
  function handleSubmitNewPassword(oldPassword: string, newPassword: string) {
    modifyPassword(oldPassword, newPassword);
    setNewPassword("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image source={{ uri: profileImage }} style={styles.image} />
        <CustomButton
          title="Changer l'avatar"
          isDisabled={false}
          onPressAction={() => loadFile()}
        />
      </View>
      <Text style={styles.title}>Bonjour, {user?.username}</Text>
      <Text style={styles.title}>
        Position Actuelle: {currentUserPosition}, {currentUserPoints} pts
      </Text>
      <Text style={styles.title}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.title}>Changer le mot de passe</Text>
      <CustomInputText
        placeholder="Mot de passe actuel"
        isPassword={true}
        value={currentPassword}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomInputText
        placeholder="Nouveau mot de passe"
        isPassword={true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <CustomButton
        title="Modifier le mot de passe"
        isDisabled={false}
        onPressAction={() =>
          handleSubmitNewPassword(currentPassword, newPassword)
        }
      />
      <CustomButton
        title="Se déconnecter"
        isDisabled={false}
        onPressAction={() => logout()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#c7ede6ff",
    gap: 12,
    margin: 4,
  },
  avatar: {
    alignItems: "flex-end",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 90,
    marginVertical: 20,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
