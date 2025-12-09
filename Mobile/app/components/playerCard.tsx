import { Text, View, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import CustomButton from "@/app/components/CustomButton";
import { router } from "expo-router";

type PlayerCardProps = {
  name: string;
  opponentId: string;
};

export default function PlayerCard(
  { name, opponentId }: PlayerCardProps
) {
  const { isAuthenticated } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <CustomButton
        title="Défier"
        isDisabled={!isAuthenticated}
        onPressAction={() => {
          router.push(`/opponent/${opponentId}`);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
