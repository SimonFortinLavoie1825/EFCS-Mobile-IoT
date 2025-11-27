import { Text, View, StyleSheet } from "react-native";
import EnableableButton from "./enableableButton";
import { useAuth } from "@/hooks/useAuth";

type PlayerCardProps = {
    name: string
}

export default function PlayerCard({name} : PlayerCardProps) {
  const styles = StyleSheet.create({
      title: {
        fontSize: 36,
        margin: 30
      },
      buttonText: {
        color: "white",
        fontSize: 24,
      },
      image: {
         width: 125, 
         height: 125,
         margin: 5 
      }
    })

  const {isAuthenticated} = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
        <Text style={styles.title}>{name}</Text>
        <EnableableButton isEnabled={isAuthenticated} onPress={() => {}}> 
          <Text style={styles.buttonText}> Défier </Text>
        </EnableableButton>
    </View>
  );
}