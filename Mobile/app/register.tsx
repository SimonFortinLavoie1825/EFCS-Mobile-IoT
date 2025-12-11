import CustomButton from "@/app/components/CustomButton";
import CustomInputText from "@/app/components/CustomInputText";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUser";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Text, View, Image } from "react-native";

// Écran "S'inscrire"
// - Récupère les champs utilisateur et appelle register (useAuth) pour créer le compte Firebase + document Firestore.
// - Après inscription, met à jour l'avatar via changeProfileImage (UserContext).
// - loadFile : ouvre DocumentPicker pour sélectionner une image et stocke l'URI localement.
// - Affiche les messages d'erreur renvoyés par la méthode register.
export default function Register() {
  const { register } = useAuth();
  const { changeProfileImage } = useUserContext();
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // handleSubmitUser : wrapper asynchrone pour appeler register avec les champs et gérer les erreurs,
  // puis réinitialiser les champs locaux.
  async function handleSubmitUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    lastName: string
  ): Promise<void> {
    try {
      await register(
        username,
        email,
        password,
        confirmPassword,
        name,
        lastName
      );

      changeProfileImage(avatar);
      setEmail("");
      setName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }

  // loadFile : ouvre le sélecteur de fichiers (image/*) et stocke l'URI en state.
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
    setAvatar(uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>S&apos;inscrire</Text>
      <Image source={{ uri: avatar?.toString() }} style={styles.image} />
      <CustomButton
        title="Charger un Avatar"
        isDisabled={false}
        onPressAction={() => loadFile()}
      />
      {/* Ici, ChatGpt m'a généré un composant conditionnel pour gérer les erreurs que me renvoit ma méthode "register" dans mon contexte d'authentification*/}
      {/*Prompt: Comment je peux faire un composant conditionnel en react-native pour afficher mes erreurs d'une méthode d'inscription ? */}
      {errorMsg !== "" && (
        <Text style={styles.errorBox}>{errorMsg}</Text>
      )}
      <CustomInputText
        placeholder="Nom d'usager"
        isPassword={false}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <CustomInputText
        placeholder="Courriel en ligne"
        isPassword={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <CustomInputText
        placeholder="Mot de passe"
        isPassword={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomInputText
        placeholder="Confirmer le mot de passe"
        isPassword={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <CustomInputText
        placeholder="Prénom"
        isPassword={false}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <CustomInputText
        placeholder="Nom de famille"
        isPassword={false}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <CustomButton
        title="S'inscrire"
        isDisabled={false}
        onPressAction={() =>
          handleSubmitUser(
            username,
            email,
            password,
            confirmPassword,
            name,
            lastName
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    gap: 12,
    margin: 4,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 90,
    marginVertical: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
  },
  errorBox: {
    color: "red",
    alignSelf: "center",
  },
  button: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 2,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  input: {
    width: "95%",
    padding: 5,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 7,
    backgroundColor: "white",
  },
  disabledButton: {
    backgroundColor: "dodgerblue",
  },
  enabledButton: {
    backgroundColor: "gray",
  },
});
