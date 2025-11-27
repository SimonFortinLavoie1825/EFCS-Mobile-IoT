import {
  Text,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUser";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "@/app/components/CustomButton";

export default function Profil() {
  const { logout } = useAuth();
  const { name , lastName, profileImage, setProfileImage } = useUserContext();

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
    setProfileImage(uri);
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
      <Text style={styles.title}>
        Bonjour, {name} {lastName}
      </Text>
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
