import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUser";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const { profileImage } = useUserContext();
  const menuItems = [
    { label: "Défis reçus", href: "/challengeReceived" },
    { label: "Défis complétés", href: "/challengeCompleted" },
    { label: "Classement des meilleurs", href: "/leaderboard" },
    { label: "Profil", href: "/profil" },
  ];
  function logoutMenu(): void {
    setOpen(false);
    logout();
  }
  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <FontAwesome size={40} name="home" />
      </Link>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("./assets/images/icon.png")
          }
          style={styles.avatarImage}
        />
      </TouchableOpacity>
      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity onPress={() => setOpen(false)}>
          <View style={styles.menuList}>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.href}
              renderItem={({ item }) => (
                <Link href={item.href} asChild onPress={() => setOpen(false)}>
                  <Text style={styles.textLink}>{item.label}</Text>
                </Link>
              )}
            />
            <TouchableOpacity onPress={() => logoutMenu()}>
              <Text style={styles.textLink}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    fontSize: 18,
    gap: 5,
  },
  menuList: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#a19f9fff",
    borderRadius: 10,
    padding: 4,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
