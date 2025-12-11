import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function DefaultTopBar() {
  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <FontAwesome size={40} name="home" />
      </Link>
      <Link href="/login" asChild>
        <Text style={styles.textLink}>Se connecter</Text>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  textLink: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
});
