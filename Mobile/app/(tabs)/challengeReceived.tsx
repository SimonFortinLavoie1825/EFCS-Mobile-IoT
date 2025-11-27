import { View, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";


export default function ChallengeReceived() {
  const [selectedId, setSelectedId] = useState<string>("");
  return (
    <View style={styles.container}>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
